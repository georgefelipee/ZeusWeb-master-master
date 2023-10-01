import React from "react";
import './quantidadeCard.css'
import { useComprasContext } from "../../periodoContext";
function QuantidadeCard({periodoSelecionado,somaQuantidadeTotal}) {

  const {ComprasContextarray,mesesDisponiveisContext,setTempoSelecionado,tempoSelecionado,somaTotalQuantidadeDinamico}= useComprasContext();

    return (
      <div className="quantidade-card">
         <h3>Estoque Total</h3>
         <p className='quantidade'>{Number(somaTotalQuantidadeDinamico).toFixed(1)} Kg</p>
         <p className='periodo'>Período: {tempoSelecionado=="2000" ? "Todos os meses" :  tempoSelecionado } </p>
      </div>
    );
  }
  
  export default QuantidadeCard;
  