const express = require("express");
const router = express.Router()
const Products_detail = require("../models/Product_Details")

router.get("/products_details" , async (req,res)=>{
    try {
        const product_details = await Products_detail.find({});
        res.status(200).json({
            status: true ,
            message: "Product is Fetched Successfully",
            data : product_details  
        })
        
    } catch (e) {
        console.log("Error while fetching product data", e.message);
        res.status(500).json({
            status: false,
            message : " Internal server Error "
        })
        
    }
})

router.post("/products_detail" , async (req , res )=>{
    const {pro_categories , pro_name ,pro_reviews, pro_price , pro_description , pro_availability , size, quantity ,wishlist , addToCart ,categories , tags , SKU ,imageurl} = req.body ;

    try {
        const result = await Products_detail.create({
            "pro_categories" : pro_categories ,
            "pro_name" : pro_name ,
            "pro_reviews" : pro_reviews ,
            "pro_price" : pro_price ,
            "pro_description" : pro_description ,
            "pro_availability" : pro_availability ,
            "size" : size ,
            "quantity" : quantity ,
            "wishlist" : wishlist ,
            "addToCart" : addToCart ,
            "categories" : categories ,
            "tags" : tags ,
            "SKU" : SKU ,
            "imageurl": imageurl ,

        })
        res.status(201).json({
            status : true ,
            message : "Product detail created successfully "
        })
        
    } catch (e) {
        console.log("Error while creating products_detail  ", e.message);
        res.status(500).json({
            status:false ,
            message : "Internal server error "
        })
        
    }
    res.status(200).json({
        message:"Create products_detail  route is hitted "
    })
})


module.exports = router