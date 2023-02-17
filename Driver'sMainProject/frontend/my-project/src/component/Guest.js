import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import bgImg from '../assets/cityDriver.webp'
import Service from '../component/service'
import Navbar from '../component/Navbar/GuestNavbar'
function Guest() {
  return (
    <>
      <Navbar />
      <div className="2xl:flex ">
        <div>
          <div className='flex flex-col justify-items-center sm:items-center w-full ml-2 2xl:my-96 my-14 '>
            <p className='text-2xl'>Hire Your 5 star Drivers</p>
            <h1 className='py-3 2xl:ml-40 text-5xl md:text-5xl font-bold 2xl:justify-center '>Commuter Solutions</h1>
            <p className="text-2xl ">This is our Service brand</p>
          </div>
        </div>
        <div>
          <img className="w-full h-full object-cover " src={bgImg} alt=''></img>
        </div>

      </div><div>
        <div className='flex justify-center mt-20'>
          <p className="text-5xl">Hire professional drivers, and all car Services
            at your finger tip .</p>

        </div>
      </div>
      <Service />
      <div className='bg-slate-50 flex justify-end mb-6 '>
        <div className='text-5xl font-sans bg-slate-50 text-emerald-600'>We Simplifies car ownership</div>
      </div>
      <div className="font-bold text-3xl text-center">
        <span class='block'>Hire professional Drivers and car wash </span>
        <span class="block">at your finger Tips </span>
        <button> <Link to='/pickAndDrop' className='w-[160px] my-5 px-6 bg-black shadow-lg shadow-blue-500/65 hover:shadow-teal-500/40 text-white font-semibold '
          type="submit">Book Now !</Link></button>
      </div>

      <footer>

      </footer>





    </>

  )
}

export default Guest