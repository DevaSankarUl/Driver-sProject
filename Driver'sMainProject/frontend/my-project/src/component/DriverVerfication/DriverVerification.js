import React,{useState} from "react";
import Table from "./table";
import {makeStyles} from "@material-ui/core/styles";
import "./styles.css";
import { useEffect } from "react";
import axios from "axios";
import { axiosAdminInstance } from "../../Axios/Axios";
import DataTable from "react-data-table-component";
import { toast } from 'react-toastify';
function DriverVerfication() {
  const [expert,setExpert]=useState([])
  console.log(expert);
  // const [Driver,setDriver]=useState()
   const useStyles = makeStyles({
        table: {
            minWidth: 650
        }
    });

    const token = localStorage.getItem ('adminToken')
    async function getAllDrivers(){
      const config={
        headers:{
          Accept:'application/json',
          Authorization :token,
          'Content-Type':'application/json',
        },
      }
      const response = await axiosAdminInstance.get('/driverStatus',config)
      setExpert(response.data.details)
    }

  useEffect(()=>{
   
    getAllDrivers()
    
  },[])
  async function block(id){
    const token =localStorage.getItem('adminToken');
    const config={
        headers:{
            Accept:'application/json',
        Authorization:token,
        'Content-Type':'application/json'
    }
}
const data = await axiosAdminInstance.put(`/driver/block/${id}`,config) 
toast.warning("Blocked Successfully")
    const details = data.data.details
    // setExpert(data.expert)
    getAllDrivers()
}
async function Unblock(id){
  const token =localStorage.getItem('adminToken');
  const config={
      headers:{
          Accept:'application/json',
      Authorization:token,
      'Content-Type':'application/json'
  }
}
const data = await axiosAdminInstance.put(`/driver/unblock/${id}`,config)
console.log("hi"); 
toast.success("unblocked Successfully")
// console.log(data,"This is data");
const details = data.data.details
// console.log(details);
  // window.relocation.reload(true)
  // setExpert(data.expert)
  getAllDrivers()
   
}
const columns = [
 { name:"Driver's Name",
 selector:(row)=>row.name
},
{
  name:'email',
  selector:(row)=>row.email
},
{
   name:'mobileNo',
   selector:(row)=>row.mobileNo
},
{
  name:'LiscenceNO',
  selector:(row)=>row.LiscenceNo
},{
  name:'Action',
  selector:(row)=>{
    return(
      <div>
        { row.blockStatus == "true" ?(
          <button onClick={()=>Unblock(row._id)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Unblock</button>
        ):(<button onClick={()=>block(row._id)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">Block</button>
        )
      }
      </div>
    )
  }
}

]

  return (
    <DataTable columns={columns} data={expert} pagination/>
  );
}
export default DriverVerfication;
 