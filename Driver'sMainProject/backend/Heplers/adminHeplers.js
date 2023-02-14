// const Product = require('../models/adminProduct')
// const { adminCarWash } = require('../controllers/admin/adminController')
const { arrayBuffer } = require('node:stream/consumers')
const Product = require('../models/adminProduct')
const cloudinary = require('../utils/cloudinary')
module.exports = {
    product: () => {
        return new Promise(async (resolve, reject) => {
            let carwashPro = await Product.find()
            resolve(carwashPro)
        })
    },
    adminCarWash: (product) => {
        // console.log(product);
        const { input, value, images } = product
        // console.log(value);
        // console.log("varille",product);
        // const values=[]
        // value.forEach((element)=>{
        //     console.log(element);
        //     values.push(element)
        // })
        // return new Promise(async (resolve, reject) => {
        //     try {
        //         const carPro = await Product({
        //             name: input.name,
        //             price: input.price,
        //             materials: value,
        //         })

        //         let images = product.imges
        //         console.log(images);
                // let imageBuffer = []
                // for (let i = 0; i < images.length; i++) {
                //     const result = await cloudinary.uploader.upload(images[i], {
                //         folder: "banner",
                //         width: 300,
                //         crop: "scale"
                //     })


                //     imageBuffer.push({
                //         public_id: result.public_id,
                //         url: result.secure_url
                //     })

                // }
                // req.body.images = imageBuffer
                //  console.log(imageBuffer);

            //     console.log(carPro);
            //     carPro.save().then(() => {
            //         console.log("sucessss");
            //     })
            // } catch (err) {
            //     console.log(err);
        //     }
        // })
    }





}