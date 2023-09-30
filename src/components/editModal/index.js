import React, { useState,useEffect } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import InputAdornment from '@mui/material/InputAdornment';
import DatePicker from "react-datepicker";
import { set } from 'date-fns/esm';


export default function FormDialogEdit({open,setOpen,gasto}) {

  const [nomeRacao,setNomeRacao] = useState()
  const [totalGasto,setTotalGasto] = useState()
  const [quantidade,setQuantidade] = useState()
  const [data, setData] = useState()
  const [botaoHabilitado, setBotaoHabilitado] = useState(false);

  useEffect(() => {
    const dataAtual = new Date(gasto.data);

    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const ano = dataAtual.getFullYear();

    const dataFormatada = `${ano}-${mes}-${dia}`;

  
    const datateste =  formatarData(gasto.data)
    setData(datateste)
    setNomeRacao(gasto.nomeRacao)
    setTotalGasto(gasto.totalGasto)
    setQuantidade(gasto.quantidade)
   
  }, [gasto]);

  function formatarData(data) {
    if (data) {
      const partes = data.split('/');
      if (partes.length === 3) {
        const [dia, mes, ano] = partes;
        return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
      }
    }
    return data; // Retorna a data original se for inválida ou não estiver definida
  }


  const handleClickButton = (evento) =>{
      axios.patch(`http://localhost:3000/gastos/${gasto._id}`,{
      nomeRacao: nomeRacao,
      totalGasto: totalGasto,
      quantidade: quantidade,
      data: data
    })
      .then(handleCloseEditar())
      .catch((err)=> console.log(err))
    
    }

  const handleChangeTotalGasto = (event) => {
      const novoValor = event.target.value;
  
      // Verifique se o novo valor é um número válido (positivo ou zero)
      if (/^-?\d*\.?\d*$/.test(novoValor)) {
        setTotalGasto(novoValor);
      }
    };
  
  const verificarCamposPreenchidos = () => {
   
    if (nomeRacao == '' || totalGasto == '' || quantidade == '' || data == '') {
      setBotaoHabilitado(false);
      return false;
    } else {
      setBotaoHabilitado(true);
      return true
    }
  };

  const handleCloseEditar = () => {
    setOpen(false);
    setNomeRacao('')
    setTotalGasto('')
    setQuantidade('')
    setData('')
    document.location.reload()
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='popup'>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar Gasto</DialogTitle>
        <DialogContent className='content-container'>
          <TextField
            autoFocus
            margin="dense"
            id="nomeRacao"
            label="Nome da ração"
            type="text"
            value={nomeRacao}
            required='true'
            onMouseEnter={()=>verificarCamposPreenchidos()}
            name='nomeRacao'
            variant="standard"
            onChange={(e)=>{
              verificarCamposPreenchidos() 
              setNomeRacao(e.target.value);
              console.log(gasto);
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
            onChange={(e)=>{
              verificarCamposPreenchidos()
              handleChangeTotalGasto(e)
            }}
          />
          <TextField
            label="Quantidade"
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
              startAdornment: <InputAdornment position="start">kg</InputAdornment>,
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
          <Button onMouseEnter={()=>verificarCamposPreenchidos()} disabled={!botaoHabilitado} onClick={handleClickButton}>Editar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
