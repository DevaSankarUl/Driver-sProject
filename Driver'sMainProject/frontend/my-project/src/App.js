import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Signup from './Pages/SignupPage'
import Login from './Pages/LoginPage'
import Admin from './Pages/AdminPage'
import DriverLogin from './component/DriverLogin'
import DriverFormPage from './Pages/DriverSignup'
import PickAndDropPage from './Pages/PickAndDropPage'
import CarWashPage from './Pages/CarWashPage'
import CarwashBook from './component/carwashBook'
import DriverProfilePage from './component/DriverProfilePage'
import AdmnLandingPage from './Pages/AdminLandingPage'
import UserTable from './Pages/AdminUserStatus'
import DriverVerify from './Pages/DriverVerification'
import AddProduct from './Pages/AdminCarWashFormPage'
import OrderDetail from './Pages/OrderDetailPage'
import CarWashorderSummary from './Pages/CarWashorderSummary'
import CheckoutSuccessPage from './Pages/CheckoutSuccessPage'
import ProtectRoute from './protectedRouter/ProtectRouter'
import ChatPage from './Pages/ChatPage'
import NotFound from './Pages/NotFoundPage'
import DriverProtector from './protectedRouter/AdminProtector'
import DriverApprove from './Pages/OrderApprovePage'
import PickDropOrderSummary from './Pages/PickDropOrder'
import Guest from './component/Guest'
function App() {
  return (
    <div>

      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Guest />} />

        <Route element={<ProtectRoute />}>
          <Route path='/home' element={<HomePage />} />
          <Route path='/pickAndDrop' element={<PickAndDropPage />} />
          <Route path='/services' element={<servicePage />} />
          <Route path='/CarWash' element={<CarWashPage />} />
          <Route path='/carwashBook' element={<CarwashBook />} />
          <Route path='/Carwashordersummary' element={<CarWashorderSummary />} />
          <Route path='/checkout-success' element={<CheckoutSuccessPage />} />
          <Route path='/PickAndDropOrderSummary' element={<PickDropOrderSummary />} />
        </Route>
        <Route path='/Driversignup' element={<DriverFormPage />} />
        <Route path='/DriverLogin' element={<DriverLogin />} />
        {/* <Route element={<ProtectRoute />}> */}
        <Route path='/driver_profilePage' element={<DriverProfilePage />} />
        <Route path='/driver_approve' element={<DriverApprove />} />
        {/* </Route> */}
        {/* admin */}
        <Route path='/adminLogin' element={<Admin />} />
        <Route path='/order_details' element={<OrderDetail />} />
        <Route path='/adminAddProduct' element={<AddProduct />} />
        <Route path='/driverVerification' element={<DriverVerify />} />
        <Route element={<DriverProtector />}>

          <Route path='/adminDashboard' element={<AdmnLandingPage />} />
          <Route path='/adminStatus' element={<UserTable />} />

          <Route path='/chat' element={<ChatPage />} />

        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}
export default App