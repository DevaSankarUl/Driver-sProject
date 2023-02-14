import React, { useState, useEffect } from "react";
import DataTable from 'react-data-table-component'
import { useDispatch } from "react-redux";
import { axiosAdminInstance } from "../Axios/Axios";
import { userpickAndDropDetails } from "./Redux/adminReducer";
const OrderDetail = ({data}) => {
  const dispatch = useDispatch()
  useEffect(() => {
    displaydriver()
  }, [])
  const [general, setGeneral] = useState('pick');
  const [approvel, setapprovel] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  console.log( approvel);

  const displaydriver = async () => {
    try {
      const res = await axiosAdminInstance.get('/pickDetails')
      setapprovel(res.data.getpick);
      //  setapprovel=res.data
      dispatch(userpickAndDropDetails(res.data))
    }
    catch (err) {
      console.log(err);
    }
  }
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setFilteredData(
      data.filter((item) =>
        Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(event.target.value.toLowerCase())
        )
      )
    );
  };
  // async function pick(id) {
  //   const token = localStorage.getItem('adminToken');
  //   const config = {
  //     headers: {
  //       Accept: 'application/json',
  //       Authorization: token,
  //       'Content-Type': 'application/json'
  //     }
  //   }
  //   const data = await axiosAdminInstance.post(`pick/${id}`, config)
  //   if (data) {
  //     displaydriver()
  //   }
  // }

  //  async function deleteData(id) {
  //   const token = localStorage.getItem('adminToken');
  //   const config = {
  //     headers: {
  //       Accept: 'application/json',
  //       Authorization: token,
  //       'Content-Type': 'application/json'
  //     }
  //   }
  //   const data = await axiosDriverInstance.delete(`delete/${id}`, config)
  //   if (data) {
  //     displaydriver()
  //   }
  // }

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
    name:"Status",
    selector:(row)=>row.status
    }


  ]




  return <table><h1 >Orders</h1><DataTable columns={columns} data={approvel} pagination
  /></table>
}

export default OrderDetail;
