import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

import { getUserLocalStorage } from "./Authprovider/utils";

const ComprasContext = createContext();

export function ComprasProvider({ children }) {

  const [ComprasContextarray, setCompras] = useState([]);
  const [mesesDisponiveisContext, setMesesDisponiveis] = useState([]);
  const [tempoSelecionado, setTempoSelecionado] = useState("2000");
  const [somaTotalGastoDinamico, setSomaTotalGastoDinamico] = useState(0)
  const [somaTotalQuantidadeDinamico, setSomaTotalQuantidadeDinamico] = useState(0)
  const [anosDisponivei, setAnosDisponivei] = useState([])
  const [anoSelecionado, setAnoSelecionado] = useState(2023)
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    pegarGastos();
  }, [tempoSelecionado,anoSelecionado,isLoading]);

  const user = getUserLocalStorage('user.id')
  function pegarGastos() {
    api
      .get(`/gastos/user/${user.id}`)
      .then((response) => {
        console.log('periodo Auth',user.id);
        const dados = response.data;
        console.log(dados);
        pegarAnos(dados)
       
        const ComprasAnoEspecifico = filtrarComprasPorAno(dados,anoSelecionado)
        console.log("ComprasAnoEspecifico",ComprasAnoEspecifico);
        pegarMeses(ComprasAnoEspecifico);

        if(Number(anoSelecionado)>2023){
          setTempoSelecionado(mesesDisponiveisContext[0])
        }
        
        const ComprasPeriodoEspecifico = ComprasPeriodo(
          tempoSelecionado,ComprasAnoEspecifico
        );

        pegarGastoTotalDinamico(ComprasPeriodoEspecifico)
        pegarQuantidadeTotalDinamico(ComprasPeriodoEspecifico)

        setCompras(ComprasPeriodoEspecifico.sort((a, b) => new Date(b.data) - new Date(a.data)));

      })
      .catch((err) => {
        console.error("Erro ao buscar dados", err);
      });
  }

  function filtrarComprasPorAno(dados, anoDesejado) {
    return dados.filter((compra) => {
      const dataString = compra.data;
      const data = new Date(dataString);
      const anoCompra = data.getUTCFullYear(); // Obter o ano da compra
  
      return anoCompra === Number(anoDesejado);
    });
  }

  function pegarGastoTotalDinamico(dados){

    const soma = dados.reduce((total,gasto)=> total  + gasto.totalGasto,0)
    setSomaTotalGastoDinamico(soma)
    console.log('setSomaTotalGastoDinamico',soma);

  }
  function pegarQuantidadeTotalDinamico(dados){

    const soma = dados.reduce((total,gasto)=> total  + gasto.quantidade,0)
    setSomaTotalQuantidadeDinamico(soma)
    console.log('setSomaTotalQuantidadeDinamico',soma);

  }


  function pegarMeses(dados) {
    const timeZone = "America/Sao_Paulo";

    const meses = dados.map((compra) => {
      const dataString = compra.data;
      const data = new Date(dataString);

      const options = { month: "long", timeZone: "UTC" };
      const mes = data.toLocaleString("pt-BR", options);

      return mes;
    });
    // Remover duplicatas e ordenar os meses
    const mesesUnicos = [...new Set(meses)].sort();
    setMesesDisponiveis(mesesUnicos);
  }

  function pegarAnos(dados) {
    const timeZone = "America/Sao_Paulo";
  
    const anos = dados.map((compra) => {
      const dataString = compra.data;
      const data = new Date(dataString);
  
      const ano = data.getFullYear(); // Extrair o ano
  
      return ano;
    });
    // Remover duplicatas e ordenar os anos
    const anosUnicos = [...new Set(anos)].sort();
    setAnosDisponivei(anosUnicos)
  }


  function ComprasPeriodo(periodo, dados) {
    if (periodo == 2000) {
      return dados
    } else {
      const arrayFormatado = filtrarComprasPorMes(periodo, dados)
      return arrayFormatado
    }

  }

  const filtrarComprasPorMes = (mes, dados) => {
    const comprasFiltradas = dados.filter((compra) => {
      const dataString = `${compra.data.slice(0, 10)}T00:00:00.000Z`;
      const data = new Date(dataString);

      // Obtém o mês da compra como um número (0 a 11)
      const mesCompra = data.getUTCMonth();

      // Mapeia o mês em um formato mais fácil de comparar
      const meses = [
        'janeiro', 'fevereiro', 'março', 'abril',
        'maio', 'junho', 'julho', 'agosto',
        'setembro', 'outubro', 'novembro', 'dezembro'
      ];
       // Obtém o mês em extenso a partir do array
       const mesCompraExtenso = meses[mesCompra];

       return mesCompraExtenso === mes;
    });

    return comprasFiltradas;

  }

  return (
    <ComprasContext.Provider
      value={{
        pegarGastos,
        ComprasContextarray,
        mesesDisponiveisContext,
        setTempoSelecionado,
        tempoSelecionado,
        setSomaTotalGastoDinamico,
        somaTotalGastoDinamico,
        somaTotalQuantidadeDinamico,
        anosDisponivei,
        setAnoSelecionado,
        anoSelecionado,
        setCompras,
        isLoading, 
        setIsLoading,
        setSomaTotalQuantidadeDinamico
        
       
      }}
    >
      {children}
    </ComprasContext.Provider>
  );
}

export function useComprasContext() {
  return useContext(ComprasContext);
}
