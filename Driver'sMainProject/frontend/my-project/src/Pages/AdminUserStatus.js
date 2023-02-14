import React from 'react'
import UsersTable from '../component/UserTable'
import AdminNavbar from '../component/Navbar/AdminNavbar'
function AdmnDashboard() {
  return (
    <div>
        <AdminNavbar/>
        <UsersTable/>
    </div>
  )
}

export default AdmnDashboard