import { Table, Button, Popconfirm } from "antd";
import React, { Component, useEffect, useState } from "react";
import api from "../../services/api";
import { useComprasContext } from "../../periodoContext";
import FormDialogEdit from "../editModal";
import { parseISO } from "date-fns";
import { format } from 'date-fns-tz';
import ptBR from "date-fns/locale/pt-BR";
import axios from "axios";
import './table.css'

function TableAntDesing() {
  const { ComprasContextarray, mesesDisponiveisContext, setTempoSelecionado } =
    useComprasContext();

  const [dataSource, setDataSource] = useState([{}]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [order, setOrder] = useState("asc");
  const [openEdit,setOpenEdit] = useState(false)
  const [gastoParaEditar, setGastoParaEditar] = useState({});

  const toggleOrder = () => {
    const newOrder = order === "asc" ? "desc" : "asc";
    setOrder(newOrder);
  };

  const columns = [
    {
      key: "1",
      title: "Nome da Ração",
      dataIndex: "nomeRacao",
      sorter: (a, b) => {
        return a.nomeRacao.localeCompare(b.nomeRacao);
      },
    },
    {
      key: "2",
      title: "Quantidade Total Kg",
      dataIndex: "quantidade",
      sorter: (a, b) => {
        const valueA = parseFloat(a.quantidade).toFixed(1);
        const valueB = parseFloat(b.quantidade).toFixed(1);
        return valueB - valueA;
      },
    },
    {
      key: "3",
      title: "Gasto Total R$",
      dataIndex: "totalGasto",
      sorter: (a, b) => {
        const valueA = parseFloat(a.totalGasto).toFixed(1);
        const valueB = parseFloat(b.totalGasto).toFixed(1);
        return valueB - valueA;
      },
    },
    {
      key: "4",
      title: "Data da compra",
      dataIndex: "data",
      render: (text, record) => {

        const dataParseada = parseISO(text);
        // Ajuste o fuso horário para UTC
        const dataUTC = new Date(dataParseada.getTime() + dataParseada.getTimezoneOffset() * 60000);
        // Formate a data para 'dd/MM/yyyy' usando o locale 'pt-BR'
        const dataFormatada = format(dataUTC, 'dd/MM/yyyy', { locale: ptBR })
     
        return dataFormatada;
      },
      
    },
    {
      title: "Ações",
      key: "actions",
      render: (text, record) => (
        <span>
          <Button className="meu-botao" onClick={() => handleEdit(record)}>Editar</Button>
          <Popconfirm
            title="Tem certeza que deseja excluir?"
            onConfirm={() => handleDelete(record._id)}
            okText="Sim"
            cancelText="Cancelar"
          > 
            <Button  className="meu-botaoDelete" type="danger">Excluir</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];
  useEffect(() => {
    api.get("/gastos").then((response) => {
      const dados = response.data;
      setDataSource(dados);
    });
  }, []);

  const handleEdit = (record) => {
    setOpenEdit(true)
    setGastoParaEditar(record)
    console.log('Editar', record);
  };

  const handleDelete = (key) => {
    axios.delete(`http://localhost:3000/gastos/${key}`)
    document.location.reload()
    console.log('Excluir', key);
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={ComprasContextarray}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: 10,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(ComprasContextarray.lenght);
          },
        }}
      ></Table>
      <FormDialogEdit 
                            open={openEdit} 
                            setOpen={setOpenEdit}  
                            gasto={gastoParaEditar}
                            />
    </>
  );
}

export default TableAntDesing;