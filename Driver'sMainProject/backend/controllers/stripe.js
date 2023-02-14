const express = require('express')
const Stripe = require('stripe')
require('dotenv').config()
const stripe = Stripe(process.env.STRIPE_KEY)



const  payment = async(req,res)=>{
    // console.log("data at Stripe",req.body);
  
const typeofwash = req.body
const id = req.body.userId
console.log("typeofwash",typeofwash);



    const session = await stripe.checkout.sessions.create({
      
        line_items: [
            {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name:  typeofwash.typeofwash.washname,
                        // images: [plan.image],
                        // description: plan.description,
                    },
                    unit_amount: typeofwash.total*100,
                },
                quantity: 1,
            },
        ],
        customer: typeofwash._id,
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/checkout-success`,
        cancel_url:  `${process.env.CLIENT_URL}/carwashBook`,
    });

    res.send({url:session.url});
// });

}
module.exports = payment;