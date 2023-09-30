import { createContext, useContext, useState, useEffect } from "react";
import api from "./services/api";

const ComprasContext = createContext();

export function ComprasProvider({ children }) {
  const [ComprasContextarray, setCompras] = useState([]);
  const [mesesDisponiveisContext, setMesesDisponiveis] = useState([]);
  const [tempoSelecionado, setTempoSelecionado] = useState("2000");
  const [somaTotalGastoDinamico, setSomaTotalGastoDinamico] = useState(0)
  const [somaTotalQuantidadeDinamico, setSomaTotalQuantidadeDinamico] = useState(0)

  useEffect(() => {
    pegarGastos();
    console.log("temposelecionado", tempoSelecionado);
  }, [tempoSelecionado]);

  function pegarGastos() {
    api
      .get("/gastos")
      .then((response) => {
        const dados = response.data;
        pegarMeses(dados);

        const ComprasPeriodoEspecifico = ComprasPeriodo(
          tempoSelecionado,dados
        );

        pegarGastoTotalDinamico(ComprasPeriodoEspecifico)
        pegarQuantidadeTotalDinamico(ComprasPeriodoEspecifico)

        setCompras(ComprasPeriodoEspecifico.sort((a, b) => new Date(b.data) - new Date(a.data)));

      })
      .catch((err) => {
        console.error("Erro ao buscar dados", err);
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

  function ComprasPeriodo(periodo, dados) {
    if (periodo == '30 dias' || periodo == '60 dias' || periodo == 2000) {
      console.log('entrou');
      const periodoaArray = periodo.split(' ');
      const periodoNumero = Number(periodoaArray[0])
      const dataAtual = new Date();
      const dataInicial = new Date(dataAtual);
      dataInicial.setDate(dataAtual.getDate() - periodoNumero);

      const comprasNoPeriodo = dados.filter((compra) => {
        const dataCompra = new Date(compra.data); // Suponhamos que 'data' é a propriedade da data da compra
        return dataCompra >= dataInicial && dataCompra <= dataAtual;
      });

      return comprasNoPeriodo
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
        ComprasContextarray,
        mesesDisponiveisContext,
        setTempoSelecionado,
        tempoSelecionado,
        setSomaTotalGastoDinamico,
        somaTotalGastoDinamico,
        somaTotalQuantidadeDinamico
      }}
    >
      {children}
    </ComprasContext.Provider>
  );
}

export function useComprasContext() {
  return useContext(ComprasContext);
}
