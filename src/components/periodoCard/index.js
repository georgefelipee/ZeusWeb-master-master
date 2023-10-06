import React, { useEffect, useState } from 'react'
import './periodoCard.css'
import api from '../../services/api';
import { useComprasContext } from '../../Context/periodoContext.js';

function PeriodoCard({somaGastoTotal, setSomaGastototal}) {

  const {ComprasContextarray,mesesDisponiveisContext,setTempoSelecionado,tempoSelecionado}= useComprasContext();

  const [gastos, setGastos] = useState([]);
  const [mesesDisponiveis, setMesesDisponiveis] = useState([]);

  const handlePeriodoChange = (event) => {
    setTempoSelecionado(event.target.value)
  };

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
     <div className="periodo-container">
            <h2>Selecione um período</h2>
            <select onChange={(e)=>handlePeriodoChange(e)} value={tempoSelecionado}>
             <option value="2000">Todos os meses</option>
             {mesesDisponiveisContext.map((item)=> (<option value={item} key={item}> {item} </option>))}
        
            </select>
      </div>
    );
  }
  
  export default PeriodoCard;