import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUserLoginDetails, clearUserToken } from "../Redux/adminReducer";

function Nav() {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);
  const Navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      Navigate('/login')
    }
  })
  return (
    <div>

      <nav className="bg-gray-900">
        <div className="max-w-7xl h-28 mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between ">

          <div className="flex items-center">
            <h1 className='text-3xl font-bold mr-4 text-emerald-300'>Commuter</h1>
            <div className="flex-shrink-0">

            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button><Link to="/home" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Home</Link></button>

                <button><Link to="/DriverLogin" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"> For Drivers</Link></button >

                <button><Link to="/carwash" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">carwash</Link></button>
              </div>
            </div>
          </div>
          <div className='hidden md:flex pl-40 '>

            <button onClick={() => {
              localStorage.removeItem('token')
              dispatch(clearUserToken())
              dispatch(clearUserLoginDetails())

            }}><Link to="/login" className='hover:text-white px-12 py-3 bg-red-400 rounded-md ml-10 font-bold flex justify-end' >Logout</Link></button>

          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400  hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>

        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">

                <a><Link to="/home" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"> Home</Link></a>

                <a><Link to="/carwash" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"> Carwash</Link></a>
                <a><Link to="/DriverLogin" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"> For Drivers</Link></a>
                <a>   <button
                  onClick={() => {

                    localStorage.removeItem('token')
                    dispatch(clearUserToken())
                    // dispatch(clearExpertLoginDetails())
                    dispatch(clearUserLoginDetails())

                  }}>
                  <Link to="/login"

                    className='hover:text-white px-8 py-3 hover:bg-blue-700 bg-red-400 rounded-md ml-10 font-bold'>Logout</Link></button></a>

              </div>
            </div>
          )}
        </Transition>
      </nav>



    </div>
  );
}

export default Nav;