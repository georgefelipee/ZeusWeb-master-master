import React, { useEffect, useState } from 'react'
import './periodoCard.css'
import api from '../../services/api';
import { useComprasContext } from '../../periodoContext';

function PeriodoCard({somaGastoTotal, setSomaGastototal, periodoSelecionado, setPeriodoSelecionado}) {

  const {ComprasContextarray,mesesDisponiveisContext,setTempoSelecionado}= useComprasContext();

  const [gastos, setGastos] = useState([]);
  const [mesesDisponiveis, setMesesDisponiveis] = useState([]);

  const handlePeriodoChange = (event) => {
    setPeriodoSelecionado(event.target.value);
    setTempoSelecionado(event.target.value)
  };


  function ComprasPeriodoEspecifico(periodo, dados) {
    if (periodo == '60' || periodo == '30' || periodo == '2000') {
      console.log('entrou');
      const periodoEmDias = Number(periodo);
      const dataAtual = new Date();
      const dataInicial = new Date(dataAtual);
      dataInicial.setDate(dataAtual.getDate() - periodoEmDias);

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
        'Janeiro', 'Fevereiro', 'março', 'abril',
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
     <div className="periodo-container">
            <h2>Selecione um período</h2>
            <select onChange={(e)=>handlePeriodoChange(e)} value={periodoSelecionado}>
             <option value="30">Últimos 30 dias</option>
             <option value="60">Últimos 60 dias</option>
             <option value="2000">Todos os meses</option>
             {mesesDisponiveisContext.map((item)=> (<option value={item} key={item}> {item} </option>))}
        
            </select>
      </div>
    );
  }
  
  export default PeriodoCard;