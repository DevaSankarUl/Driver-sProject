import React, { useState } from 'react'
import bgImg from '../assets/drivers.jpeg'
import { useNavigate, Link } from 'react-router-dom'
import { useFormik } from "formik"
import { userLoginSchema } from '../validation/useLoginSchema'
import { useDispatch, useSelector } from "react-redux"
import { userToken } from './Redux/adminReducer'
import { userLoginDetails } from './Redux/adminReducer'
import { toast } from 'react-toastify';
import { axiosUserInstance } from '../Axios/Axios'

const initialValues = {
  email: "",
  password: "",
}


const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.admin.userToken)
  const [validation, setValidation] = useState('')

  let navigate = useNavigate()
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: userLoginSchema,
    onSubmit: async (values, action) => {
      // console.log(values);

      const response = await axiosUserInstance.post('/login', values)
        .then((response) => {
          console.log(response);
          if (response.data.data === "Logged in") {
            localStorage.setItem('token', response.data.token)
            dispatch(userToken(response.data.token))
            navigate('/home')
            toast.success("Login Successfully")

            console.log(response.token);
          }
          else if (response.error === "you were Blocked") {
            console.log(response.data);
            setValidation(response.data)
            console.log(response.data.data);
          }
          else if (response.data === "Password Incorrect") {
            setValidation(response.data.data)

          } else if (response.data === "Invalid User") {
            setValidation(response.data.data)

          }

          dispatch(userLoginDetails(values))
        }).catch((error) => {
          toast.error(error.response.data.data)
          setValidation(response.data)
        })
      action.resetForm();
    },

  })

  return (
    <div className='bg bg-slate-200 h-screen bg-gradient-to-r  flex justify-center items-center overflow-hidden'>
      <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full '>
        <div className="hidden sm:block">
          <img className="bg-image object-cover w-full h-full p-48" src={bgImg}></img>
        </div>
        <div className="bg-slate-200 text-blue-600 flex flex-col justify-center">
          <form className="max-w-[400px]  w-full mx-auto bg-opacity-50 p-8 px-8 rounded-lg"

            onSubmit={handleSubmit}>
            <h2 className='text-4xl dark:text-white font-bold text-center'>LOGIN</h2>

            <div className='flex flex-col text-Blue-400 font-bold py-2  '>

              <label htmlFor="">Email</label>

              <input className='rounded-lg bg-gray mt-2 p-2 focus:border-blue-500 focus:bg-yellow-400 focus:outline-none'

                type="email"
                autoComplete="off"
                name="email"
                id="email"
                placeholder='Email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur} />
              <div><p className='text-red-500'>{validation}</p></div>
              {errors.email && touched.email ? (<p className='form-error text-red-500'>{errors.email}</p>) : null}
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

            {/* <div className='flex justify-between text-Blue-400 font-bold py-2'>
              <p><input type="checkbox" />Remember Me</p>
              <p> Forgot Password</p>
            </div> */}
            <button className='w-full my-5 py-2 bg-blue-500 shadow-lg shadow-blue-500/65 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'
              type="submit">LogIn</button>
            <div className='flex  justify-center text-Blue-400 font-bold py-2'><p><Link to="/signup"> Create an account ? Register</Link></p></div>
            <div className='flex  justify-center text-Blue-400 font-bold py-2'><p><Link to="/DriverLogin"> DriverLogin</Link></p></div>

          </form>
        </div>
      </div>

    </div>
  )
}

export default Login