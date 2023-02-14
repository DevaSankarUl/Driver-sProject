
import React,{useState,useEffect} from 'react'
import { axiosAdminInstance } from '../Axios/Axios';

function AdminLandingPage() {
  // const [approvalCount, setApprovalCount] = useState('');
  const [UsersCount, setUsersCount] = useState('');
  const [driverCount, setdriverCount] = useState();

  const [OrderCount, setOrderCount] = useState('');

  useEffect(() => {
    fetchUsersCount();
    fetchDriversCount();
    fetchOrderCount();
  }, []);
 
  async function fetchUsersCount() {
    const token = localStorage.getItem('adminToken');
    const userCount = await axiosAdminInstance('/getUserCount');
    setUsersCount(userCount.data.response);
  }
  async function fetchDriversCount() {
    const token = localStorage.getItem('adminToken');
    const expertsCount = await axiosAdminInstance.get('/getdriverApprovecount');
    setdriverCount(expertsCount.data.response);
  }
  async function fetchOrderCount() {
    const token = localStorage.getItem('adminToken');
    const orders = await axiosAdminInstance.get('/getorderCount')
    setOrderCount(orders.data.response);
  }
  return (
    <div>  
       <header className="bg-white shadow">
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
    </div>
    
</header>
<div className="m-12">
      <div className="flex  justify-around  flex-wrap ">
        <div className=" h-24 flex items-center justify-center bg-slate-500/75 w-72 rounded-xl mt-6 px-4 shadow-lg">
          <div className="flex-row">
            <p className="text-3xl font-bold text-center">
              {UsersCount ? UsersCount : 0}
            </p>
            <p className="text-lg  font-semibold">Users</p>
          </div>
        </div>
        <div className=" h-24 flex items-center justify-center bg-slate-500/75 w-72 rounded-xl mt-6 px-4 shadow-lg">
          <div className="flex-row">
            <p className="text-3xl  font-bold text-center">
              {driverCount ? driverCount : 0}
            </p>
            <p className="text-lg  font-semibold">Active Drivers</p>
          </div>
        </div>

          {' '}
          <div className=" h-24 flex items-center justify-center bg-slate-500/75 w-72 rounded-xl mt-6 px-4 shadow-lg hover:cursor-pointer">
            <div className="flex-row">
              <p className="text-3xl  font-bold text-center">
                {OrderCount ? OrderCount : 0}
              </p>
              <p className="text-lg  font-semibold ">Orders</p>
            </div>
          </div>
        {/* </Link> */}
      </div>
    </div>
      </div>
  )
}
// }
export default AdminLandingPage