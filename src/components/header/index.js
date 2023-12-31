import React, { useEffect, useState } from "react";
import "./header.css";
import { FaDog } from "react-icons/fa";
import { useComprasContext } from "../../Context/periodoContext.js";
import { format, isThisMonth, set } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useNavigate } from "react-router-dom";

function Header() {
  
  
  const { anosDisponivei,setAnoSelecionado,anoSelecionado,setTempoSelecionado,mesesDisponiveisContext, tempoSelecionado } = useComprasContext();

  const [mesAtual, setMesAtual] = useState('')
  const navigate = useNavigate()

  const handleClickButton = () => {
    localStorage.removeItem('nome')
    localStorage.removeItem('email')
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    navigate('/login')
 
  }

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
      <h1 className="tituloheaderr" >
        <div>
           Pet<label>Investiment</label> <FaDog></FaDog>
        </div>

        <button onClick={handleClickButton}>Sair</button>
      </h1>
      {/* <div className="mesAndAnoContainer">
        {/* <p>
          Ano Selecionado:
          <select value={anoSelecionado} onChange={(e) =>handleChangeAno(e)}>
            {anosDisponivei.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </p> }
      </div> */}
    </header>
  );
}

export default Header;
