    import axios from 'axios'
    import React, { useEffect ,useState} from 'react'
    import DataTable from 'react-data-table-component'
    import '../component/DriverVerfication/styles.css'
    function UsersTable() {
        const [user,setUser]=useState([])
        useEffect(()=>{
            
        const token = localStorage.getItem('adminToken');
        getAllUsers();
        async function getAllUsers(){
            const config={
                headers:{
                    Accept:'application/json',
                    Authorization:token,
                    'Content-Type':'application/json',
                },
            }
                const response = await axios.get('http://localhost:4000/api/admin/userInfo',config)
                setUser(response.data.details)
            
            
        }
    },[user])

    async function block(id){
        const token =localStorage.getItem('adminToken');
        const config={
            headers:{
                Accept:'application/json',
            Authorization:token,
            'Content-Type':'application/json'
        }
    }
    const data = await axios.put(`http://localhost:4000/api/admin/block/${id}`,config) 
    if(data.blocked){
        setUser(data.user)
        }
    }
    async function unblock(id){
        const token =localStorage.getItem('adminToken');
        const config={
            headers:{
                Accept:'application/json',
            Authorization:token,
            'Content-Type':'application/json'
        }
    }
    const data = await axios.put(`http://localhost:4000/api/admin/unblock/${id}`,config)
    if(data.unblocked){
        window.relocation.reload(true)
    setUser(data.user)
    }
    }

    const columns=[
        {
            name:'username',
            selector:(row)=>row.name
        },
        {
        name:'Email',
        selector:(row)=>row.email
        },
        {
        name:'phoneNo',
        selector:(row)=>row.phoneNo
    },{
        name:'Action',
        selector:(row)=>{
        return(
            <div>
                {row.blockStatus?(
                    <button
                    onClick={()=>unblock(row._id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Unblock
                    </button>
                
                ):(<button onClick={()=>block(row._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">Block
                </button>)}
            </div>
        )
    },
    },             
    ]

    return (
        <DataTable 
        columns={columns} 
        data={user}
        pagination/>
    )
    }

    export default UsersTable