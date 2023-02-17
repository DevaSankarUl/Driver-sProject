import React, { useState } from 'react'
// import bgImg from '../assets/LoginPage .jpg'
import { useFormik } from "formik"
import { AdminSchema } from '../validation/adminSchema'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { admintoken } from './Redux/adminReducer'
import { toast } from 'react-toastify';
import { axiosAdminInstance } from '../Axios/Axios'
const initialValues = {
  name: "",
  password: ""
}


const Admin = () => {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const [validation, setValidation] = useState('')
  console.log(validation);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: AdminSchema,
    onSubmit: async (values, action) => {
      const response = await axiosAdminInstance.post('/adminLog', values)

        .then((response) => {
          if (response.data.status === "passwordWrong") {
            console.log(response.data.status);

            setValidation(response.status)
          } else if (response.data.status === "Invalid admin") {
            console.log("Cannot Login");
            setValidation(response.data.status)
          } else if (response.data.data === "Logged in ") {
            dispatch(admintoken(response.data.admintoken))
            localStorage.setItem('admintoken', response.data.admintoken)
            setValidation(response.data.status)
            navigate('/adminDashboard')
            toast.success("Admin Loggedin Successfully")
          }
        })
        .catch((error) => {
          toast.error(error.response.data.status)
          setValidation(response.data)
        })
      action.resetForm();
    }
  })

  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-1 h-screen w-full '>

        <div className="bg-slate-700 text-zinc-700 flex flex-col justify-center">
          <form className="max-w-[400px]  w-full  mx-auto bg-slate-50 p-8 px-8 rounded-lg"
            onSubmit={handleSubmit}>
            <h2 className='text-4xl dark:text-white font-bold text-center'>ADMIN</h2>
            <div className='flex flex-col text-Blue-400 font-bold py-2'>
              <label htmlFor="">AdminName</label>
              <input className='rounded-lg bg-gray-100 mt-2 p-2 focus:border-blue-500 focus:bg-blue-600 focus:outline-none '
                type="text"

                autoComplete="off"
                name="name"
                id="name"
                placeholder='Name'
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur} />
              <div><p className='text-red-500'>{validation.name}</p></div>
              {errors.name && touched.name ? (<p className='form-error text-red-500'>{errors.name}</p>) : null}

            </div>

            <div className='flex flex-col text-Blue-400 font-bold py-2'>
              <label htmlFor="">Password</label>
              <input className='rounded-lg bg-gray mt-2 p-2 focus:border-blue-500 focus:bg-yellow-400 focus:outline-none'
                type="password"
                autoComplete="off"
                name="password"
                id="password"
                placeholder='Password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur} />
              <div><p className='text-red-600'>{validation}</p></div>
              {errors.password && touched.password ? (<p className='form-error text-red-500'>{errors.password}</p>) : null}
            </div>

            <button className='w-full my-5 py-2 bg-blue-500 shadow-lg shadow-blue-500/65 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'
              type="submit">Admin Login In</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Admin