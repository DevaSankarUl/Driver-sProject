import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { axiosUserInstance } from '../Axios/Axios'
import { useSelector } from "react-redux";
// const carwashOrderSummary = () => {
const localUser = localStorage.getItem('token')
// console.log("local storage user is: ", localUser);
const Payment = () => {
    //     useEffect(() => {

    //     }, [])

    const users = useSelector((state) => state.admin.userDetails)
    console.log(users);
    const location = useLocation()
    // console.log("useLocation",location);
    const typeofwash = location.state
    console.log("washname", typeofwash);

    const tax = typeofwash.price * 0.20
    const total = parseInt(typeofwash.price + tax)
    console.log(tax);
    console.log(typeofwash.price);
    console.log(total);
    const handleCheckout = async (req, res) => {
        const response = await axiosUserInstance.post('/create-checkout-session', {

            typeofwash,
            total,
            userId: users

        })
            .then((res) => {
                console.log("payment", res);
                if (res.data.url) {
                    window.location.href = res.data.url
                }
            })
            .catch((err) => console.log(err.message));
    }


    return (
        <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
            <div className="flex justify-start item-start space-y-2 flex-col ">
                <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">{typeofwash._id}</h1>
                <p className="text-base font-medium leading-6 text-gray-600">21st Mart 2021 at 10:34 PM</p>
            </div>
            <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                    <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                        <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">Customer???s Cart</p>

                    </div>
                    <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                            <h3 className="text-xl font-semibold leading-5 text-gray-800">Summary</h3>
                            <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                <div className="flex justify-between  w-full">
                                    <p className="text-base leading-4 text-gray-800">Subtotal</p>
                                    <p className="text-base leading-4 text-gray-600">{typeofwash.price}</p>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <p className="text-base leading-4 text-gray-800">
                                        Discount <span className="bg-gray-200 p-1 text-xs font-medium leading-3  text-gray-800">STUDENT</span>
                                    </p>
                                    <p className="text-base leading-4 text-gray-600">{tax}</p>
                                </div>

                            </div>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-base font-semibold leading-4 text-gray-800">Total</p>
                                <p className="text-base font-semibold leading-4 text-gray-600">{total}</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                            <h3 className="text-xl font-semibold leading-5 text-gray-800">Materials Used</h3>
                            <div className="flex justify-between items-start w-full">
                                <div className="flex justify-center items-center space-x-4">
                                    <div class="w-8 h-8">

                                    </div>
                                    <div className="flex flex-col justify-start items-center">
                                        <p className="text-lg leading-6 font-semibold text-gray-800">
                                            {typeofwash.materials}
                                            <br />
                                            {/* <span className="font-normal">Delivery with 24 Hours</span> */}
                                        </p>
                                    </div>
                                </div>
                                {/* <p className="text-lg font-semibold leading-6 text-gray-800">???8.00</p> */}
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <button onClick={() => handleCheckout()} className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">View Carrier Details</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
                    <h3 className="text-xl font-semibold leading-5 text-gray-800">Customer Details</h3>
                    <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
                        <div className="flex flex-col justify-start items-start flex-shrink-0">
                            <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                {/* <img src="https://i.ibb.co/5TSg7f6/Rectangle-18.png" alt="avatar" /> */}
                                <div className=" flex justify-start items-start flex-col space-y-2">
                                    <p className="text-base font-semibold leading-4 text-left text-gray-800"></p>
                                    <p className="text-sm leading-5 text-gray-600">10 Previous Orders</p>
                                </div>
                            </div>

                            <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3 7L12 13L21 7" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <p className="cursor-pointer text-sm leading-5 text-gray-800">{users.email}</p>
                            </div>
                        </div>
                        <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
                            <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                                <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                                    <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
                                    <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{users.phoneNo}</p>
                                </div>
                                <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 ">
                                    <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Billing Address</p>
                                    <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">180 North King Street, Northhampton MA 1060</p>
                                </div>
                            </div>
                            <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                                <button className="mt-6 md:mt-0 py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-gray-800">Edit Details</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment; 