// import React, { Fragment } from 'react'
// import axios from 'axios'
// // import url from '../slices/api'
// function PayButton({productItem}) {
//     const handleCheckout=()=>{
//         // console.log(productItem);
//         axios.post ('http://localhost:4000/api/Stripe/create-checkout-session',
//         {
//             productItem

//         }).then((res)=>{
//             console.log(res);
//             if(res.data){
//                 console.log(res.data);
//                 window.location.href =res.data

//             }
//         }).catch((err)=>{
//             console.log(err.message);
//         })
//     }
//   return (
//     <Fragment>
//     <button onClick={()=>{
//         handleCheckout()
//     }}>CheckOut</button>
//     </Fragment>
//   )
// }

// export default PayButton