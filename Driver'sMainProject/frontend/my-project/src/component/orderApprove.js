import React, { useState, useEffect } from "react";
import DataTable from 'react-data-table-component'
import { useDispatch } from "react-redux";
import { axiosAdminInstance, axiosDriverInstance } from "../Axios/Axios";
import { userpickAndDropDetails } from "./Redux/adminReducer";
const OrderDetail = () => {
  const dispatch = useDispatch()
  const expertEmail = localStorage.getItem("Drivertoken")
  useEffect(() => {
    displaydriver()
  }, [])
  // const [general, setGeneral] = useState('pick');
  const [approvel, setapprovel] = useState([])

  console.log( approvel);

  const displaydriver = async () => {
    const config = {
      headers:{
        Accept:'application/josn',
        Authorization:expertEmail,
        'Content-Type':'application-json'
      }
    }
    try {
      const res = await axiosDriverInstance.get('/pickDetails',config)
      setapprovel(res.data.getpick);
      //  setapprovel=res.data
      dispatch(userpickAndDropDetails(res.data))
    }
    catch (err) {
      console.log(err);
    }
  }
  async function pick(id) {
    const driver = localStorage.getItem('adminToken');
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: driver,
        'Content-Type': 'application/json'
      }
    }
    const data = await axiosDriverInstance.post(`pick/${id}`, config)
    if (data) {
      displaydriver()
    }
  
  }
  async function  drop(id){
    const driver = localStorage.getItem('Drivertoken');
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: driver,
        'Content-Type': 'application/json'
      }
    }
    const data =await axiosDriverInstance.post(`drop/${id}`,config)
    if(data){
      displaydriver()
    }
  }
  async function  success(id){
    const token = localStorage.getItem('adminToken');
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: token,
        'Content-Type': 'application/json'
      }
    }
    const data =await axiosDriverInstance.post(`success/${id}`,config)
    if(data){
      displaydriver()
    }
  }
  

  async function deleteData(id) {
    const token = localStorage.getItem('Drivertoken');
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: token,
        'Content-Type': 'application/json'
      }
    }
    const data = await axiosDriverInstance.delete(`delete/${id}`, config)
    if (data) {
      displaydriver()
    }
  }

  const columns = [
    {
      name: 'pick',
      selector: (row) => row.pick
    },
    {
      name: 'Destination',
      selector: (row) => row.Destination
    },
    {
      name: 'Time',
      selector: (row) => row.time
    },
    {
      name: 'CarType',
      selector: (row) => row.carType

    },
    {
      name: 'Date',

      selector: (row) => row.date

    },
    {
      name: 'Action',
      selector: (row) => {
        return (
          <div>
            {row.status == 'pick' ? (

<button
  className="p-4 ml-4 text-black bg-cyan-600 rounded font-semibold cursor-pointer hover:bg-cyan-900"
  onClick={() => pick(row._id)}
>
  Pick
</button>
) : (
<button
  className="p-4 ml-4 text-black bg-lightGreen rounded font-semibold cursor-pointer bg-green-800"
// onClick={() => setGeneral(1)}
onClick={()=>drop(row._id)}
>
  Drop
</button>
)}
          </div>
        )
      },
    },
    {
      name: 'cancel',
      selector: (row) => {
        return (
          <div>
            {row.status == 'pick' || row.status == 'drop' ? (
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={() => deleteData(row._id)}
              >cancel
              </button>
            ) : (
              <div>
<button
              onClick={()=>success(row._id)}
             className="p-4 ml-4 text-black bg-lightGreen rounded font-semibold cursor-pointer bg-green-400">
              success
            </button>
                
              </div>
            )}
          </div>
        )
      }
    }

  ]




  return (
  <DataTable columns={columns} data={approvel}
    pagination />)
}

export default OrderDetail;
