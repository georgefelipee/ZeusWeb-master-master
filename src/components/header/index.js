import React, { useEffect, useState } from "react";
import "./header.css";
import { FaDog } from "react-icons/fa";
import { useComprasContext } from "../../periodoContext";
import { format, isThisMonth, set } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

function Header() {
  const { anosDisponivei,setAnoSelecionado,anoSelecionado,setTempoSelecionado,mesesDisponiveisContext } = useComprasContext();

  const [mesAtual, setMesAtual] = useState('')

  const handleChangeAno = (event) => {

    setAnoSelecionado(event.target.value)
    console.log("event",event.target.value);
    setTempoSelecionado("2000")
  }


  useEffect(() => {

     // Função para obter o mês atual em extenso
     const obterMesAtual = () => {
      const dataAtual = new Date();
      const mes = format(dataAtual, 'MMMM', { locale: ptBR }); // 'ptBR' para português do Brasil
      return mes;
    };

    // Atualiza o estado com o mês atual em extenso
    setMesAtual(obterMesAtual());
    
  }, [])
  

  return (
    <header>
      <h1>
        Pet<label>Investiment</label> <FaDog></FaDog>
      </h1>
      <div className="mesAndAnoContainer">
        <p>Mês Atual: {mesAtual}</p>
        <p>
          Ano Selecionado:
          <select value={anoSelecionado} onChange={(e) =>handleChangeAno(e)}>
            {anosDisponivei.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </p>
      </div>
    </header>
  );
}

export default Header;
