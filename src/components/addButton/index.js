import React, { useState } from 'react'
import './addButton.css'
import FormDialog from '../dialogMUI'
import { FaPlus } from 'react-icons/fa';

function AddButton() {

  const [open,setOpen] = useState(false)

  const handleClickButton = ()=>{
    setOpen(true)
  }
  
    return(
        <>
            <FormDialog open={open} setOpen={setOpen}/>
            <button onClick={() => handleClickButton()}  className='addButton'>
                Adicionar Compras <FaPlus style={{ marginLeft: '5px', verticalAlign: 'middle' }} />
            </button>
        </>
      
    
    );
  }
  
  export default AddButton;
  