import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './historico.css'
import { format,parseISO} from 'date-fns';
import { utcToZonedTime} from 'date-fns-tz';
import {FaEdit} from 'react-icons/fa'
import {CiSquareRemove} from 'react-icons/ci'
import FormDialogEdit from '../editModal';
import AlertDialogSlide from '../removeModal';
import { useComprasContext } from '../../periodoContext';
import TableAntDesing from '../tableAntDesing';


function Historico() {
    const [gastos, setGastos] = useState([]);
    const [openEdit,setOpenEdit] = useState(false)
    const [openRemove,setOpenRemove] = useState(false)
    const [gastoParaEditar, setGastoParaEditar] = useState({});

    const {ComprasContextarray,mesesDisponiveisContext,setTempoSelecionado}= useComprasContext();

    function formatarDatasNoArray(gastos){
        return gastos.map((objeto) => {
            // Analisar a data no objeto (caso não esteja em um objeto de data)
            const dataComFusoHorario = objeto.data;

            // Analisar a data, considerando o fuso horário
            const dataObj = new Date(dataComFusoHorario);
            const dia = format(dataObj, 'dd')
            const mes = format(dataObj, 'MM')
            const ano = format(dataObj, 'yyyy')
            const diaFormat = Number(dia)+1

            // Formatar a data no padrão brasileiro (dd/MM/yyyy)
            const dataFormatada = `${String(diaFormat)}/${mes}/${ano}`;
            
            // Retornar o objeto com a data formatada
            return { ...objeto, data: dataFormatada };      
        })
    }
    const handleClickButton = (id)=>{
        setOpenEdit(true)
        abrirModalEdicao(id)
      }
      const handleClickButtonRemove = (id)=>{
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

    return (
     <div className="historico-container">
        <h2 className='historico-title'>Histórico de Compras</h2>
        <div className="table-container">
            {/* <table>
            <thead>
                <tr>
                <th>Nome da Ração</th>
                <th>Quantidade</th>
                <th>Gasto</th>
                <th>Data</th>
                </tr>
            </thead>
            <tbody>
                {ComprasContextarray.map((item)=> (
                    <tr>
                    <td>{item.nomeRacao}</td>
                    <td>{item.quantidade} kg</td>
                    <td>R$ {(Number(item.totalGasto).toFixed(2))}</td>
                    <td>{item.data}  <FaEdit  onClick={()=>handleClickButton(item._id)}/> <CiSquareRemove onClick={()=> handleClickButtonRemove(item._id) }/></td>
                     <FormDialogEdit 
                            open={openEdit} 
                            setOpen={setOpenEdit}  
                            gasto={gastoParaEditar}
                            />
                    <AlertDialogSlide gasto={gastoParaEditar}  open={openRemove}  setOpen={setOpenRemove}  />
                  </tr>
                ))}
            </tbody>
            </table> */}
            <TableAntDesing > </TableAntDesing>
        </div>
     </div>
    );
  }
  
  export default Historico;