import React, { useState,useEffect } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './dialog.css'
import axios from 'axios';
import InputAdornment from '@mui/material/InputAdornment';
import DatePicker from "react-datepicker";

import './dialog.css'

export default function FormDialog(props) {

  const [nomeRacao,setNomeRacao] = useState('')
  const [totalGasto,setTotalGasto] = useState()
  const [quantidade,setQuantidade] = useState()
  const [data, setData] = useState()
  const [botaoHabilitado, setBotaoHabilitado] = useState(false);

  useEffect(() => {
    const dataAtual = new Date();

    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const ano = dataAtual.getFullYear();

    const dataFormatada = `${ano}-${mes}-${dia}`;

    setData(dataFormatada);
    verificarCamposPreenchidos()
    setNomeRacao('')
    setTotalGasto('')
    setQuantidade('')
  }, []);


  const handleClickButton = (evento) =>{
      axios.post("http://localhost:3000/gastos",{
      nomeRacao: nomeRacao,
      totalGasto: totalGasto,
      quantidade: quantidade,
      data: data
    })
      .then(handleCloseCadastrar())
      .catch((err)=> console.log(err))
    
    }
  
  const verificarCamposPreenchidos = () => {
   
    if (nomeRacao == '' || totalGasto == '' || quantidade == '' || data == '') {
      setBotaoHabilitado(false);
    } else {
      setBotaoHabilitado(true);
    }
  };

  const handleCloseCadastrar = () => {
    props.setOpen(false);
    setNomeRacao('')
    setTotalGasto('')
    setQuantidade('')
    verificarCamposPreenchidos()
    document.location.reload()
  };
  const handleClose = () => {
    setNomeRacao('')
    setTotalGasto('')
    setQuantidade('')
    setBotaoHabilitado(false)
    verificarCamposPreenchidos()
    props.setOpen(false);
  };

  return (
    <div className='popup'>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Cadastrar Gasto</DialogTitle>
        <DialogContent className='content-container'>
          <TextField
            autoFocus
            margin="dense"
            id="nomeRacao"
            label="Nome da ração"
            type="text"
            value={nomeRacao}
            onMouseEnter={()=>verificarCamposPreenchidos()}
            name='nomeRacao'
            variant="standard"
            onChange={(e)=>{
              verificarCamposPreenchidos() 
              setNomeRacao(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="totalGasto"
            required='true'
            value={totalGasto}
            name='totalGasto'
            label="Gasto Total R$"
            type="number"
            onMouseEnter={()=>verificarCamposPreenchidos()}
            variant="standard"
            InputProps={{
              startAdornment: <InputAdornment position="start">R$</InputAdornment>,
            }}
            onChange={(e)=>{
              verificarCamposPreenchidos()
              setTotalGasto(e.target.value);
            }}
          />
          <TextField
            label="Quantidade Total Kg"
            id="quantidade"
            required='true'
            value={quantidade}
            variant="standard"
            type='number'
            onMouseEnter={()=>verificarCamposPreenchidos()}
            onChange={(e)=>{
              verificarCamposPreenchidos()
              setQuantidade(e.target.value);
           }}
            sx={{ m: 0.5, width: '20ch' }}
            InputProps={{
              startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="data"
            name='data'
            type="date"
            value={data}
            required='true'
            onMouseEnter={()=>verificarCamposPreenchidos()}
            onMouseLeave={()=>verificarCamposPreenchidos()}
            variant="standard"
            onChange={(e)=>{
              verificarCamposPreenchidos()
              setData(e.target.value);
              console.log(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onMouseEnter={()=>verificarCamposPreenchidos()} disabled={!botaoHabilitado} onClick={handleClickButton}>Cadastrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
