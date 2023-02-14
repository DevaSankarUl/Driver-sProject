import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'


const useAuth = () => {
    const adminToken = useSelector((state) => state.admin.admintoken )
    console.log(adminToken);
    const admin = adminToken
    return admin && adminToken
}

const DriverRoute = () => {
    const isAuth = useAuth()
    return isAuth ? <Outlet /> : <Navigate to='/adminLogin' />
}

export default DriverRoute