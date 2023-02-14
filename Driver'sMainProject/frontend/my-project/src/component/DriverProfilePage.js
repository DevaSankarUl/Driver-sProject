import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import DriverNavbar from '../component/Navbar/DriverNavbar'
import DriverProImg from '../assets/drivers.jpeg'
import { Image } from 'cloudinary-react'
import { axiosDriverInstance } from '../Axios/Axios'
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux'
import { expertDetails } from './Redux/adminReducer'
function DriverProfilePage() {
  const dispatch=useDispatch()
  const [ImageSelcted, setImageSelected] = useState()
  const [profilePhoto, setProfilePhoto] = useState('')
  // console.log("profilePhoto", profilePhoto);

  const navigate = useNavigate()
  const expertEmail = localStorage.getItem("Drivertoken")
  const uploadImage = async () => {

    const formData = new FormData()
    formData.append('file', ImageSelcted)
    formData.append('upload_preset', 'aqhb3bms')
    await axios.post('https://api.cloudinary.com/v1_1/duhxuwanl/image/upload', formData)

      .then(async (response) => {
        // console.log(response);
        const decoded = jwt_decode(expertEmail);
        // console.log(decoded);
        // console.log(decoded.email.email);
        // console.log("response is : ", response)
        const url = response.data.url 
        // console.log(url);

        const res = await axiosDriverInstance.post('/photo-change', { url, email: decoded })
        profile()
        
        // console.log("photochange before re", res);
      })

    // console.log("files uploaded are : ", imageSelected);
  }
  const profile = async () => {
    const decoded = jwt_decode(expertEmail);
    // console.log("tokenDecode", decoded);
    const changeImage = await axiosDriverInstance.post('/getDriver', { email: decoded })
    // console.log("res after chanssssge :", changeImage)
    const expert = changeImage.data.driver
   
    // console.log("profilepicChange", expert);
    setProfilePhoto(expert)
    dispatch(expertDetails(expert))
  }
  useEffect(() => {
    profile()
  }, [])




  return (
    <div classNmae='overscroll-y-none'>
      <DriverNavbar />

      <div><button onClick={() => {
        navigate('/order_details')
      }
      } class="absolute top-0 right-10 h-16 w-16  hover:bg-blue-700 rounded-md mt-10 ">ORDERS</button></div>

      <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"></link>
      <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"></link>

      <section className="pt-10 bg-blueGray-50 ">
        <div className="w-full lg:w-4/12 px-4 mx-auto ">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                  <div className="relative">
                    <img alt="..." src={profilePhoto.image ? profilePhoto.image : DriverProImg}

                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"></img>

                  </div>

                </div>

                <div className="w-full px-4 text-center mt-40">

                  <div >
                    <input className='hover:text-white  hover:bg-blue-700 font-bold w-56' type="file"
                      onChange={(e) => {
                        setImageSelected(e.target.files[0])

                      }} />< Image style={{ width: 200 }} cloudName='duhxuwanl'
                    /> </div>
                  <div><button className='hover:text-white px-8 py-3 hover:bg-blue-700 bg-red-600 rounded-md ml-10 font-bold mt-2' onClick={() => {
                    uploadImage()
                  }}>Submit</button>


                  </div>
                </div>
              </div>
              <div className="text-center mt-24">
                <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700">

                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {profilePhoto.email}
                </div>
                <div className="mb-2 text-blueGray-600 mt-10">
                  <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                  {profilePhoto.LiscenceNo
                  }
                </div>
                <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                  {profilePhoto.name}
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-9/12 px-4">
            <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
              {profilePhoto.mobileNo}
            </p>
            <a href="javascript:void(0);" className="font-normal text-pink-500">
              Show more
            </a>
          </div>
        </div>
      </div>
            </div>
          </div>
        </div>
        <footer className="relative  pt-8 pb-6 mt-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                {/* <div className="text-sm text-blueGray-500 font-semibold py-1">

                </div> */}
              </div>
            </div>
          </div>
        </footer>
      </section>

    </div>
  )
}

export default DriverProfilePage