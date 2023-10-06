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

 

    return (
      <div className='container-gastos'>  
        <div className='gastos-container'>
          <h3>Gasto Total</h3>
          <p className='preco'>R$ {Number(somaTotalGastoDinamico).toFixed(2)}</p>
          <p className='periodo'>Período: {tempoSelecionado=="2000" ? "Todos os meses" :  tempoSelecionado } </p>
          <QuantidadeCard  />
        </div> 
        <div className='button-periodo-container'>
          <AddButton />
          <div className='periodo-containerWidth'>
              <PeriodoCard/>
          </div>
        </div>
        
      </div>
      
    );
  }
  
  export default GastosCard;
  