import { createContext, useContext, useState, useEffect } from 'react';
import api from './services/api';

const ComprasContext = createContext();

export function ComprasProvider({ children }) {
  const [ComprasContextarray, setCompras] = useState([]);
  const [mesesDisponiveisContext, setMesesDisponiveis] = useState([]);
  const [tempoSelecionado, setTempoSelecionado] = useState()

  function pegarGastos() {
    api.get('/gastos')
      .then((response) => {

        const dados = response.data
        pegarMeses(dados)
        setCompras(dados.sort((a, b) => new Date(b.data) - new Date(a.data)))

        console.log('context',mesesDisponiveisContext);
        console.log('compras context',ComprasContextarray);
   

      })
      .catch((err) => {
        console.error('Erro ao buscar dados', err);
      })
  }

  function pegarMeses(dados) {
    const timeZone = 'America/Sao_Paulo'
    
    const meses = dados.map((compra) => {

      const dataString = compra.data;
      const data = new Date(dataString);
  
      const options = { month: 'long', timeZone: 'UTC' };
      const mes = data.toLocaleString('pt-BR', options);

      return mes;
    });
    // Remover duplicatas e ordenar os meses
    const mesesUnicos = [...new Set(meses)].sort();
    setMesesDisponiveis(mesesUnicos);
   
  }



  useEffect(() => {

    pegarGastos()
    console.log('temposelecionado',tempoSelecionado);
  
  }, [tempoSelecionado]);

  return (
    <ComprasContext.Provider value={{ ComprasContextarray, mesesDisponiveisContext,setTempoSelecionado }}>
      {children}
    </ComprasContext.Provider>
  );
}

export function useComprasContext() {
  return useContext(ComprasContext);
}
