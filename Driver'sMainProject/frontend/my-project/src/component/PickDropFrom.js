import {useState,useEffect} from 'react'
import {useFormik} from 'formik'
import axios from 'axios'
import { axiosUserInstance } from '../Axios/Axios'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const initialValues={
  pick:'Trivandrum',
  Destination:'',
  carType:'AMT',
  date:'',
  time:''
}
const PickDrop=()=> {
  const navigate=useNavigate()
  const user =useSelector ((state)=>state.admin.userToken)
  // initialValues:initialValues
  // onSubmit:aynsc(values)=>{

  // }
  // const [error, setError] = useState(null)
  const [minDate, setMinDate] = useState('');
  useEffect(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() + 1);
    setMinDate(yesterday.toISOString().substring(0, 10));
  }, []);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    onSubmit:async(values,action)=>{
  const response =await axiosUserInstance.post('/pickDetails',{
    values,
    headers:{'content-Type':'application/json'},
    Authorization:user
  })
  .then((res)=>{
    console.log("pickDropResponse",res);
    if(res.data.mssg === 'ordered by user'){
      navigate('/PickAndDropOrderSummary')
    }else{
      navigate('/pickAndDrop')
    }
  })
  action.resetForm();
},
})
  return (
    <>  
    <div className='h-screen bg-gradient-to-t from-emerald-600 to-indigo-600 flex justify-center items-center overflow-hidden'>
    <div className=' flex justify-center'>
    <form className="w-full max-w-lg border-8  border-gray-500/75 rounded box-border  p-20 "
    onSubmit={handleSubmit}>Pick And Drop
  
    <div className="flex flex-wrap -mx-3 mb-6">
  <div className="w-full px-3 ">
      <label htmlFor='grid-first-name' className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
      </label>
      <div className="relative">
        <select className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 mx-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" 
         type="text"
         name='pick'
         value={values.pick}
         onChange={handleChange}>  
          <option>Trivandrum</option>
          <option>Kollam</option>
          <option>pathanamthitta</option>
          <option>Ernakulam</option>
          <option> kottayam</option>
           <option> Trissur</option>
          
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
     

    </div>
  </div>
   
 
  <div className="flex flex-wrap -mx-3 mb-6">
  <div className="w-full px-3 ">
      <label htmlFor='grid-first-name' className="block uppercase tracking-wide text-gray-0 text-xs font-bold mb-2" >
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 mx-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" 
      type="text" 
      name='Destination'
      placeholder="Destination Location"
      value={values.Destination}
    onChange={handleChange}
      />

    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-2">
   
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label htmlFor="grid-state" className="block uppercase tracking-wide text-gray-0 text-xs font-bold mb-2" >
       Car Type
      </label>
      <div className="relative">
      <select className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 mx-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" 
      type="text"
      name='carType'
      value={values.carType}
      onChange={handleChange}>   
          <option>AMT</option>
          <option>Manual</option>
          <option>DCT</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
 
  </div>
  <div className="-mx-3 flex flex-wrap">
        <div className="w-full px-3 sm:w-1/2">
          <div className="mb-5">
            <label htmlFor='date'
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Date
            </label>
            <input
              type="date"
              name="date"
              min={minDate}
              id="date"
              value={values.date}
              onChange={handleChange}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        </div>
        <div className="w-full px-3 sm:w-1/2">
          <div className="mb-5">
            <label htmlFor="time"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Time
            </label>
            <input
              type="time"
              name="time"
              id="time"
              value={values.time}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            onChange={handleChange}
           />
          </div>
        </div>
      </div>
      <button className='w-full my-5 py-2 bg-zinc-500 shadow-lg shadow-blue-500/65 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'
              type="submit">Order</button>
</form>
</div>
</div>
</>
  )
}

export default PickDrop

