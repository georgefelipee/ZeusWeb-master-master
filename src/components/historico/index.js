import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './historico.css'
import { format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { FaEdit } from 'react-icons/fa'
import { CiSquareRemove } from 'react-icons/ci'
import FormDialogEdit from '../editModal';
import AlertDialogSlide from '../removeModal';
import { useComprasContext } from '../../Context/periodoContext.js';
import TableAntDesing from '../tableAntDesing';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Historico() {
  const [gastos, setGastos] = useState([]);
  const [openEdit, setOpenEdit] = useState(false)
  const [openRemove, setOpenRemove] = useState(false)
  const [gastoParaEditar, setGastoParaEditar] = useState({});


  const { ComprasContextarray, mesesDisponiveisContext, setTempoSelecionado } = useComprasContext();

  const handleClickButton = (id) => {
    setOpenEdit(true)
    abrirModalEdicao(id)
  }
  const handleClickButtonRemove = (id) => {
    setOpenRemove(true)
    abrirModalRemove(id)
  }
  const abrirModalRemove = (id) => {
    const gasto = gastos.find((item) => item._id === id);
    setGastoParaEditar(gasto);
  };

  const abrirModalEdicao = (id) => {
    const gasto = gastos.find((item) => item._id === id);
    setGastoParaEditar(gasto);
    setOpenEdit(true);
  };
  const notify = () => toast.success("Gasto excluido com sucesso!", {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  return (
    <div className="historico-container">
      <h2 className='historico-title'>Histórico de Compras</h2>
      <div className="table-container">
        <TableAntDesing notify={notify}> </TableAntDesing>
      </div>
      <ToastContainer position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
    </div>
  );
}

export default Historico;