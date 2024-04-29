const express = require("express");
const router = express.Router()
const Products_detail = require("../models/Product_Details")
const imagekit = require("imagekit")

const AdminVerification = require("../middlewares/adminVerication")

const multerUploads = require("../configurations/multerConfig")

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

// image ipload credentials 
const imagekitClient = new imagekit({
    publicKey: 'public_SbAHeXmB14+KG4vFutzIPC/VagA=',
    privateKey: 'private_vASX/j618rFbrKZhaDLBFDifkOI=',
    urlEndpoint: 'https://ik.imagekit.io/kvjlcl2o9'
});

router.post("/products_detail", AdminVerification,multerUploads, async (req, res) => {
    // const { pro_categories, pro_name, pro_price, pro_description, pro_availability, size, quantity, tags, imageurl } = req.body;

    // if (!pro_categories || !pro_name  || !pro_price, !pro_description, !pro_availability, !size, !quantity, !tags, !imageurl) {
    //     return res.status(400).json({
    //         status: false,
    //         message: "Please provide all the details"
    //     })
    // }
    try {

        // uploading image 
         const uploadedFile = await imagekitClient.upload({
            file: req.file.buffer, // file buffer from Multer
            fileName: req.file.originalname,
            useUniqueFilename: true // Ensure unique filenames on ImageKit
        });

        const transformedUrl = imagekitClient.url({
            path: `/${uploadedFile.name}`,
            transformation: [{ height: 300, width: 400 }]
        });

        // const product = new Products_detail({
        //     pro_categories,
        //     pro_name,
        //     pro_price,
        //     pro_description,
        //     pro_availability,
        //     size,
        //     quantity,
        //     tags,
        //     imageurl: transformedUrl
        // })

        // await product.save();
        res.status(200).json({
            status: true,
            message: "Product is added Successfully",
            data: transformedUrl
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