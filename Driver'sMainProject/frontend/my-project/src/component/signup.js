
import React, { useState } from 'react'
import bgImg from '../assets/LoginPage .jpg'
import { ErrorMessage, Formik, useFormik } from "formik"
import { signupSchema } from '../validation/userSchema'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { userAllDetails } from './Redux/adminReducer'
const initialValues = {
  name: "",
  email: "",
  mobileNo: '',
  password: "",
  confirm_Password: ''
}


const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: signupSchema,
    onSubmit: async (values, action) => {
      const response = await axios.post("http://localhost:4000/api/user/signup", {
        values
        // method: "POST",
        // body: JSON.stringify(values),
        // headers: { "Content-Type": 'application/json' }

      })

        // const json = await response.json()
        // if (!response.ok) {
        //   setError(json.error)
        //   console.log(error);
        // }
        // if (response.ok) {
        //   if (json.data === "Existing user") {
        //     setError(json.data);
        //     console.log("userExists", json.data);
        //   }

        //   setError(null)
        //   console.log("Successfull", json)
        //   console.log(json);
        .then((response) => {
          if (response.data.mssg === "Existing user") {
            setError(response.data.mssg)
          }
          else {
            navigate('/login')
          }
          dispatch(userAllDetails(values))

        })
      action.resetForm();
    },
  })
  return (
    // <div>

    //   <div className='grid grid-cols-1 sm:grid-cols-1 h-screen w-full '>

    //     <div className="bg-slate-700 text-zinc-700 flex flex-col justify-center">
    //       <form className="max-w-[400px]  w-full mx-auto bg-emerald-500 p-8 px-8 rounded-lg"
    //         onSubmit={handleSubmit}>
    //         <h2 className='text-4xl dark:text-white font-bold text-center'>SIGNUP</h2>
    //         <div className='flex flex-col text-Blue-400 font-bold py-2'>
    //           <label htmlFor="">UserName</label>
    //           <input className='rounded-lg bg-gray-100 mt-2 p-2 focus:border-blue-500 focus:bg-yellow-400 focus:outline-none '
    //             type="text"


    //             name="name"
    //             id="name"
    //             placeholder='Name'
    //             value={values.name}
    //             onChange={handleChange}
    //             onBlur={handleBlur} />
    //           {errors.name && touched.name ? (<p className='form-error text-red-500'>{errors.name}</p>) : null}

    //         </div>
    //         <div className='flex flex-col text-Blue-400 font-bold py-2'>
    //           <label htmlFor="">Email</label>
    //           <input className='rounded-lg bg-gray mt-2 p-2 focus:border-blue-500 focus:bg-yellow-400 focus:outline-none '
    //             type="email"

    //             name="email"
    //             id="email"
    //             placeholder='Email'
    //             value={values.email}
    //             onChange={handleChange}
    //             onBlur={handleBlur} />
    //           {errors.email && touched.email ? (<p className='form-error text-red-500'>{errors.email}</p>) : null}
    //         </div>
    //        <div className='flex flex-col text-Blue-400 font-bold py-2'>
    //           <label htmlFor="">mobileNo</label>
    //           <input className='rounded-lg bg-gray mt-2 p-2 focus:border-blue-500 focus:bg-white-400 focus:outline-none '
    //             type='number'
    //             autoComplete="off"
    //             name="mobileNo"
    //             id="moibleNo"
    //             placeholder='mobileNo'
    //             value={values.mobileNo}
    //             onChange={handleChange}
    //             onBlur={handleBlur} />
    //           {errors.mobileNo && touched.mobileNo ? (<p className='form-error text-red-500'>{errors.mobileNo}</p>) : null}
    //         </div>
    //         <div className='flex flex-col text-Blue-400 font-bold py-2'>
    //           <label htmlFor="">Password</label>
    //           <input className='rounded-lg bg-gray mt-2 p-2 focus:border-blue-500 focus:bg-yellow-400 focus:outline-none'
    //             type="password"

    //             name="password"
    //             id="password"
    //             placeholder='Password'
    //             value={values.password}
    //             onChange={handleChange}
    //             onBlur={handleBlur} />
    //           {errors.password && touched.password ? (<p className='form-error text-red-500'>{errors.password}</p>) : null}
    //         </div>
    //         <div className='flex flex-col text-Blue-400 font-bold py-2'>
    //           <label htmlFor="">Confirm Password</label>
    //           <input className='rounded-lg bg-gray mt-2 p-2 focus:border-blue-500 focus:bg-yellow-400 focus:outline-none'
    //             type="password"
    //             autoComplete="off"
    //             name="confirm_Password"
    //             id="confirm_Password"
    //             placeholder='Confirm Password'
    //             value={values.confirm_Password}
    //             onChange={handleChange}
    //             onBlur={handleBlur} />

    //         </div>
    //         {errors.confirm_Password && touched.confirm_Password ? (<p className='form-error text-red-500'>{errors.confirm_Password}</p>) : null}
    //         <div className='flex justify-between text-Blue-400 font-bold py-2'>
    //           <p><input type="checkbox" />Remember Me</p>
    //           <p> Forgot Password</p>
    //         </div>
    //         <button className='w-full my-5 py-2 bg-blue-500 shadow-lg shadow-blue-500/65 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'
    //           type="submit">Signup</button>
    //       </form>
    //     </div>
    //   </div>
    // </div>
    <div>
      
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          
            <h3 className="text-4xl font-bold text-purple-600">SIGN UP
              {/* <h1 className='text-3xl font-bold mr-4 text-emerald-300'>Commutor</h1> */}
            </h3>

        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
        <div>
        <img className="w-full h-full object-cover " src={bgImg} alt=''></img>
      </div>
           <form 
             onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Name
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text" className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"


                  name="name"
                  id="name"
                  placeholder='Name'
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur} />
                {errors.name && touched.name ? (<p className='form-error text-red-500'>{errors.name}</p>) : null}


              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="email" className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"

                  name="email"
                  id="email"
                  placeholder='Email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur} />
                {errors.email && touched.email ? (<p className='form-error text-red-500'>{errors.email}</p>) : null}


              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"

              >
               Mobile No 
              
              </label>
           
              <input
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                type='number'
                autoComplete="off"
                name="mobileNo"
                id="moibleNo"
                placeholder='mobileNo'
                value={values.mobileNo}
                onChange={handleChange}
                onBlur={handleBlur} />
              {errors.mobileNo && touched.mobileNo ? (<p className='form-error text-red-500'>{errors.mobileNo}</p>) : null}
              <label htmlFor=""
               className="block text-sm font-medium text-gray-700 undefined"
              >password</label>

              <div className="flex flex-col items-start">
                <input
                  type="password"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  name="password"
                  id="password"
                  placeholder='Password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur} />
                {errors.password && touched.password ? (<p className='form-error text-red-500'>{errors.password}</p>) : null}


              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Confirm Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password" className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  autoComplete="off"
                  name="confirm_Password"
                  id="confirm_Password"
                  placeholder='Confirm Password'
                  value={values.confirm_Password}
                  onChange={handleChange}
                  onBlur={handleBlur} />
{errors.confirm_Password && touched.confirm_Password ? (<p className='form-error text-red-500'>{errors.confirm_Password}</p>) : null}

              </div>
            </div>
            <div className="flex items-center justify-end mt-4">
              <a
                className="text-sm text-gray-600 underline hover:text-gray-900"
                href="/login"
              >
                Already registered?
              </a>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup



