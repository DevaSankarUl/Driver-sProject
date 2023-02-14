import React from "react";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import DataTable from 'react-data-table-component'
import { allData } from "./constants";
import { useEffect ,useState} from "react";

import { axiosAdminInstance } from "../../Axios/Axios";

// const tableHead = {
//   name: "Campaign Name",
//   parentId: "Campaign Id",
//   campaignType: "Type",
//   status: "Status",
//   channel: "Channel",
//   action: "Actions"
// };

const Table = () => {
//   
    const [Driver,setDriver]=useState([])
    console.log(Driver);
    useEffect(()=>{
        const token = localStorage.getItem('adminToken')
        Drivers()
        async function Drivers(){
            const config={
                headers:{
                    Accept:'application/json',
                    Authorization:token,
                    'Content-Type':'application/json',
                },
            }
            const res = await axiosAdminInstance.get('/driverStatus',config)
            setDriver(res.data.details)
            console.log("Data onnm vanille",res.data.details);
           }
    },[])
 
const columns =[
    {
        name:'DriverName',
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
        name:'DrivingLiscence',
        selector:(row)=>row.LiscenceNo
    }
]
return <DataTable columns={columns} data={Driver}/>
};

export default Table;
