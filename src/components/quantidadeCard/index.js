import React from "react";
import './quantidadeCard.css'
function QuantidadeCard({periodoSelecionado,somaQuantidadeTotal}) {
    return (
      <div className="quantidade-card">
         <h3>Estoque Total</h3>
         <p className='quantidade'>{somaQuantidadeTotal} Kg</p>
         <p className='periodo'>Período: Últimos {periodoSelecionado} dias</p>
      </div>
    );
  }
  
  export default QuantidadeCard;
  