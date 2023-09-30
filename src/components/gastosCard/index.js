import React, { useEffect, useState } from 'react'
import './gastosCard.css'
import AddButton from '../addButton';
import PeriodoCard from '../periodoCard';
import axios from 'axios';
import QuantidadeCard from '../quantidadeCard';

function GastosCard() {
  const [periodoSelecionado, setPeriodoSelecionado] = useState('30'); // Padrão: últimos 30 dias
  
  const [mesesDisponiveis, setMesesDisponiveis] = useState([]);
  
  const[somaGastoTotal, setSomaGastototal] = useState(0)
  const[somaQuantidadeTotal, setSomaQuantidadetotal] = useState(0)

  useEffect(()=>{
    axios.get('http://localhost:3000/gastos')
        .then((response) => {
            const dados= response.data
            const soma = response.data.reduce((total, gasto)=> total + gasto.totalGasto,0)
            setSomaGastototal(Number(soma).toFixed(2))

          const gastosTotais =  calcularGastosTotais(dados)
          setSomaGastototal(gastosTotais)

          const quantidadeTotal= calcularQuantidadeTotal(dados)
          setSomaQuantidadetotal(quantidadeTotal)
          console.log(somaQuantidadeTotal);

        })
        .catch((err)=>{
            console.error('Erro ao buscar dados', err);
        })
  },[periodoSelecionado]); 

  const calcularGastosTotais = (dados) => {
    const periodoEmDias = parseInt(periodoSelecionado);
    const dataAtual = new Date();
    const dataInicial = new Date(dataAtual);
    dataInicial.setDate(dataAtual.getDate() - periodoEmDias);

    const comprasNoPeriodo = dados.filter((compra) => {
      const dataCompra = new Date(compra.data); // Suponhamos que 'data' é a propriedade da data da compra
      return dataCompra >= dataInicial && dataCompra <= dataAtual;
    });

    const gastosTotais = comprasNoPeriodo.reduce((total, compra) => {
      return total + compra.totalGasto; // Suponhamos que 'valor' é a propriedade do valor da compra
    }, 0);

    return gastosTotais;
  };

  const calcularQuantidadeTotal = (dados) => {
    const periodoEmDias = parseInt(periodoSelecionado);
    const dataAtual = new Date();
    const dataInicial = new Date(dataAtual);
    dataInicial.setDate(dataAtual.getDate() - periodoEmDias);

    const comprasNoPeriodo = dados.filter((compra) => {
      const dataCompra = new Date(compra.data); // Suponhamos que 'data' é a propriedade da data da compra
      return dataCompra >= dataInicial && dataCompra <= dataAtual;
    });

    const quantidadeTotais = comprasNoPeriodo.reduce((total, compra) => {
      return total + compra.quantidade; // Suponhamos que 'valor' é a propriedade do valor da compra
    }, 0);

    return quantidadeTotais;
  };


    return (
      <div className='container-gastos'>  
        <div className='gastos-container'>
          <h3>Gasto Total</h3>
          <p className='preco'>R$ {somaGastoTotal.toFixed(2)}</p>
          <p className='periodo'>Período: Últimos {periodoSelecionado} dias</p>
        </div> 
         <QuantidadeCard somaQuantidadeTotal={somaQuantidadeTotal.toFixed(2)}  periodoSelecionado={periodoSelecionado} />
        <div className='button-periodo-container'>
          <AddButton />
        </div>
        <PeriodoCard 
          somaGastoTotal={somaGastoTotal} 
          setSomaGastototal={setSomaGastototal} 
          periodoSelecionado={periodoSelecionado} 
          setPeriodoSelecionado={setPeriodoSelecionado} />
      </div>
      
    );
  }
  
  export default GastosCard;
  