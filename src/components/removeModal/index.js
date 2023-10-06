import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import './removemodal.css'
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({open,setOpen,gasto}) {

  const customButtonStyle = {
   
    color: 'red', // Cor do texto do botão
    '&:hover': {
      backgroundColor: 'blue', // Cor ao passar o mouse por cima
    },
  };


  const handleClickRemove = () => {
    axios.delete(`http://localhost:3003/gastos/${gasto._id}`)
    setOpen(false);
    document.location.reload()
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Excluir compra"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Você deseja excluir essa compra ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button style={customButtonStyle} onClick={handleClickRemove}>EXCLUIR</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
