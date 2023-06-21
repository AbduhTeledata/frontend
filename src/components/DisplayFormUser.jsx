import React from 'react'
import TableUser from './TableUser';
import FormInputUser from './FormInputUser';
import { useState } from 'react';

const DisplayFormUser = () => {
    const [tableData, setTableData] = useState([])
    const [formInputData, setformInputData] = useState(
        {
        fullName:'',
        emailAddress:'',
        salary:''
        }
    );
    
    const handleChange=(evnt)=>{  
        const newInput = (data)=>({...data, [evnt.target.name]:evnt.target.value})
        setformInputData(newInput)
    }
    
    const handleSubmit= (evnt) =>{
        evnt.preventDefault();
        const checkEmptyInput = !Object.values(formInputData).every(res=>res==="")
        if(checkEmptyInput)
        {
        const newData = (data)=>([...data, formInputData])
        setTableData(newData);
        const emptyInput= {fullName:'', emailAddress:'', salary:''}
        setformInputData(emptyInput)
        }
    }  

  return (
    
    <div className="container">
     <div className="row">
         <div className="col-sm-8">
         <FormInputUser handleChange={handleChange} formInputData={formInputData} handleSubmit={handleSubmit}/>
         <TableUser tableData={tableData}/>
         </div>
         <div className="col-sm-4">

         </div>
     </div>
    </div>
    
  )
}

export default DisplayFormUser
