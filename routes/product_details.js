const express = require("express");
const router = express.Router()
const Products_detail = require("../models/Product_Details")

const AdminVerification = require("../middlewares/adminVerication")

router.get("/products_details", async (req, res) => {
    try {
        const product_details = await Products_detail.find({});
        res.status(200).json({
            status: true,
            message: "Product is Fetched Successfully",
            data: product_details
        })

    } catch (e) {
        console.log("Error while fetching product data", e.message);
        res.status(500).json({
            status: false,
            message: " Internal server Error "
        })

    }
})


router.post("/products_detail", AdminVerification, async (req, res) => {
    const { pro_categories, pro_name, pro_price, pro_description, pro_availability, size, quantity, tags, imageurl } = req.body;

    if (!pro_categories || !pro_name  || !pro_price, !pro_description, !pro_availability, !size, !quantity, !tags, !imageurl) {
        return res.status(400).json({
            status: false,
            message: "Please provide all the details"
        })
    }


    try {

        const product = new Products_detail(req.body)

        await product.save();
        res.status(200).json({
            status: true,
            message: "Product is added Successfully",
            data: product
        })

    } catch (e) {
        console.log("Error while adding product data", e.message);
        res.status(500).json({
            status: false,
            message: " Internal server Error "
        })

    }
})


module.exports = router