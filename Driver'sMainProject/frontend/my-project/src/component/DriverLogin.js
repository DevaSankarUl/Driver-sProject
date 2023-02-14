import React,{useState} from 'react'
import { useNavigate ,Link} from 'react-router-dom'
import { useFormik } from 'formik'
import {DriverLoginSchema} from '../validation/DriveLogSchema'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import {DriverToken} from './Redux/adminReducer'
import {toast} from 'react-toastify'

    const initialValues={
    email:"",
    password:""
}
const DriverLogin=()=> {
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const [error,setError]=useState(null)
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: DriverLoginSchema,
        onSubmit:  async(values, action) =>{
          const response = await axios.post('http://localhost:4000/api/Driver/login',{
          values
          })
          .then((response)=>{
              console.log("dataLogin",response);
            if(response.data.data ==="password Incorrect")
            setError(response.data.data)
           else if(response.data.data === "Invalid User")
           setError(response.data.data)
           else if(response.data.blockStatus === 'true')
          setError(response.data.data)
          else{
            localStorage.setItem('Drivertoken',response.data.token)
            const res =response.data.token
            dispatch(DriverToken(res))
              navigate('/driver_profilePage')
          }
          }).catch((error)=>{
            console.log(error,"this is error")
            // console.log(error.response.data.message);
            toast.error(error.response.data.message)
          })
            action.resetForm();
        },
    })
    

  return (
    <div className='h-screen bg-gradient-to-b from-neutral-900 to-indigo-600 flex justify-center items-center overflow-hidden'>
    <div className="flex h-screen w-full items-center justify-center  bg-cover bg-no-repeat" >
      <div className="rounded-xl bg-gray-900 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <div className="text-white">
          <div className="mb-8 flex flex-col items-center">
            <img src="" width="150" alt="" srcSet="" />
            <h1 className="mb-2 text-2xl">Driver Login</h1>
            <span className="text-gray-300">Enter Login Details</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 text-lg">
              <input className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" 
              type="email"
              autoComplete="off" 
             name="email" 
             placeholder="Email" 
             value={values.email}
             onChange={handleChange}
             onBlur={handleBlur}/>
             {/* {errors.email && touched.email?(<p className='form-error text-black'>{errors.email}</p>):null} */}
            </div>
           
            <div className="mb-4 text-lg">
              <input className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" 
              type='password'
              autoComplete='off'
              name='password'
              id='password' 
              placeholder="Password" 
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}/>
                 {errors.password && touched.password ? (<p className='form-error text-black'>{errors.password}</p>) : null}
            </div>
             {error ? <p style={{ color: 'blue' }} className="text-center">{error}</p> : ''}
            <div className="mt-8 flex justify-center text-lg text-black">
              <button type="submit" className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600">Login</button>
            </div>
             <div className='flex justify-center'> <a className='ml-2'><Link to="/DriverSignup" className='rounded-3xl  bg-opacity-50 px-9 py-o text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600'>SignUp</Link> </a></div>
          </form>
        </div>
      </div>
    </div></div>
  )
}

export default DriverLogin