
import React, { useEffect, useState } from 'react'
import drywashconcentrator from '../assets/dry Wash concentrated.webp'
import { axiosUserInstance } from '../Axios/Axios'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './Navbar/UserNavbar'


function CarwashBook() {
  const userId = useSelector((state) => state.admin.userDetails.userid)

  const navigate = useNavigate()
  const [products, setProducts] = useState([])



  useEffect(() => {
    carwash()
    getuserDetail()
  }, [])


  const getuserDetail = async () => {
    const user = await axiosUserInstance.get(`/userDetail/${userId}`)
  }
  const carwash = async () => {
    const displayproduct = await axiosUserInstance.post('/getProduct',{
      headers:{'content-Type':'application/json'},
      Authorization:userId,
      Accept:'application/json'
    })
    const getProduct = displayproduct.data.data
    setProducts(getProduct)

  }
  const buyHandler = (product) => {
    // console.log('button worked');
    const token = localStorage.getItem('token')
    console.log("product is", product);
    navigate('/Carwashordersummary', { state: product })
  }
  return (

    <section>

      <Navbar />
      <div>
        <div className='flex  justify-center '>
          <p className="text-5xl">Introducing Essential Car Wash
            Starting at ₹300 .</p>
        </div>

        {products.map((product) => {
          // console.log(product);
          return (
            <div>
              <div className='flex justify-center mt-10 p-5 overflow-x: auto;'>
                <p className="text-5xl font-serif">{product.washname}</p>
                <p className="text-3xl font-bold">₹ {product.price}</p>
                <div className="card-actions">
                  <button onClick={() => {
                    buyHandler(product)

                  }}

                    className="bg-green-400 mb-10  hover:bg-green-700 text-white font-bold py-2 px-4 rounded" >Buy Now</button>

                </div>
              </div>
              <div className='flex justify-center mt-10'>
                <p className="text-3xl">Material Used</p>
              </div>
              <div className='flex sm:flex-wrap flex-wrap justify-center w-50'>
                <div className="relative">

                  <img className="md:w-[400px] md:h-80 w-44 h-44  border-black content-evenly rounded-md m-10" src={product.firstImage} />
                  <div className='uppercase font-bold absolute xm:top-20 md:left-48 top-5 left-20'>
                    <span>{product.materials[0]}</span>
                  </div>
                </div>
                <div className="relative">

                  <img className="md:w-[400px] md:h-80 w-44 h-44  border-black content-evenly rounded-md m-10" src={product.secondImage} />
                  <div className='uppercase font-bold absolute xm:top-20 md:left-48 top-5 left-20'>
                    <span>{product.materials[1]}</span>

                  </div>
                </div>
                <div className="relative">

                  <img className="md:w-[400px] md:h-80 w-44 h-44  border-black content-evenly rounded-md m-10" src={product.thirdImage} />
                  <div className='uppercase font-bold absolute xm:top-20 md:left-48 top-5 left-20'>
                    <span>{product.materials[2]}</span>
                  </div>
                </div>
                <div className="relative">

                  <img className="md:w-[400px] md:h-80 w-44 h-44  border-black content-evenly rounded-md m-10" src={product.fourthImage} />
                  <div className='uppercase font-bold absolute xm:top-20 md:left-48 top-5 left-20'>
                    <span>{product.materials[3]}</span>
                  </div>
                </div>
                {/* <div className="relative">

                  <img className="md:w-[400px] md:h-80 w-44 h-44  border-black content-evenly rounded-md m-10" src={product.fourthImage} />
                  <div className='uppercase font-bold absolute xm:top-20 md:left-48 top-5 left-20'>
                    <span>Car Wash</span>
                  </div>
                </div> */}
              </div>
            </div>
          )
        })}
      </div>

      <div>
        <div className="font-bold text-3xl text-center p-10">
          <span class='block'>We clean  professionally interior and exterio your car </span>
          <span class="block">at your finger Tips .</span>
          <button className='w-[160px] my-5 py-2 bg-black shadow-lg shadow-blue-500/65 hover:shadow-teal-500/40 text-white font-semibold '
            type="submit">Book Now !</button>
        </div>
      </div>

    </section>

  )
}

export default CarwashBook