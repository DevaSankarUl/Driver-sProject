import React from 'react'
import { useNavigate } from 'react-router-dom'
import card from '../assets/car-steering-wheel-logo.webp'
import card2 from '../assets/Carwash.jpg'
function Service() {
  const navigate = useNavigate()
  const handler = () => {
    navigate('/pickAndDrop')
  }
  const handle = () => {
    navigate('/carwash  ')
  }
  return (
    <div>
      <div className='flex justify-center text font-bold text-6xl mt-20 text-teal-600  mb-16 '>SERVICES </div>
      <div className='card'>

        <div className="relative">
          <img className="md:w-[400px] md:h-80 w-44 h-44 cursor-pointer  border-solid border-2 border-black content-between rounded-s m-10" onClick={handler} src={card}></img>
          <div className='uppercase font-bold absolute sm:top-20 md:left-36 top-14 left-8'>
            <span>Professional driver</span>
          </div>
        </div>

        <div className="relative">
          <img className="md:w-[400px] md:h-80 w-44 h-44 cursor-pointer border-solid border-2 border-black content-evenly rounded-md m-10" onClick={handle} src={card2}></img>
          <div className='uppercase font-bold absolute xm:top-10 md:left-48 top-20 left-20'>
            <span>Car Wash</span>
          </div>
        </div>

      </div>
      <footer>

      </footer>

    </div>
  )
}

export default Service