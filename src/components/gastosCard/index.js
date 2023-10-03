import React, { useEffect, useState } from 'react'
import './gastosCard.css'
import AddButton from '../addButton';
import PeriodoCard from '../periodoCard';
import axios from 'axios';
import QuantidadeCard from '../quantidadeCard';
import { useComprasContext } from '../../Context/periodoContext.js';

function GastosCard() {
        
   const {somaTotalGastoDinamico,ComprasContextarray,mesesDisponiveisContext,setTempoSelecionado,tempoSelecionado,}= useComprasContext();

  const [mesesDisponiveis, setMesesDisponiveis] = useState([]);
  
  const[somaGastoTotal, setSomaGastototal] = useState(0)
  const[somaQuantidadeTotal, setSomaQuantidadetotal] = useState(0)

  // const calcularGastosTotais = (dados) => {
  //   const periodoEmDias = parseInt(periodoSelecionado);
  //   const dataAtual = new Date();
  //   const dataInicial = new Date(dataAtual);
  //   dataInicial.setDate(dataAtual.getDate() - periodoEmDias);

  //   const comprasNoPeriodo = dados.filter((compra) => {
  //     const dataCompra = new Date(compra.data); // Suponhamos que 'data' é a propriedade da data da compra
  //     return dataCompra >= dataInicial && dataCompra <= dataAtual;
  //   });

  //   const gastosTotais = comprasNoPeriodo.reduce((total, compra) => {
  //     return total + compra.totalGasto; // Suponhamos que 'valor' é a propriedade do valor da compra
  //   }, 0);

  //   return gastosTotais;
  // };

  // const calcularQuantidadeTotal = (dados) => {
  //   const periodoEmDias = parseInt(periodoSelecionado);
  //   const dataAtual = new Date();
  //   const dataInicial = new Date(dataAtual);
  //   dataInicial.setDate(dataAtual.getDate() - periodoEmDias);

  //   const comprasNoPeriodo = dados.filter((compra) => {
  //     const dataCompra = new Date(compra.data); // Suponhamos que 'data' é a propriedade da data da compra
  //     return dataCompra >= dataInicial && dataCompra <= dataAtual;
  //   });

  //   const quantidadeTotais = comprasNoPeriodo.reduce((total, compra) => {
  //     return total + compra.quantidade; // Suponhamos que 'valor' é a propriedade do valor da compra
  //   }, 0);

  //   return quantidadeTotais;
  // };


    return (
      <div className='container-gastos'>  
        <div className='gastos-container'>
          <h3>Gasto Total</h3>
          <p className='preco'>R$ {Number(somaTotalGastoDinamico).toFixed(2)}</p>
          <p className='periodo'>Período: {tempoSelecionado=="2000" ? "Todos os meses" :  tempoSelecionado } </p>
        </div> 
         <QuantidadeCard  />
        <div className='button-periodo-container'>
          <AddButton />
        </div>
        <PeriodoCard 
        
         />
      </div>
      
    );
  }
  
  export default GastosCard;
  