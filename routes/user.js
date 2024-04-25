const express = require("express");
const router = express.Router()

const User = require("../models/UserReg")
const UserLogin = require("../models/UserLogin")

// const 

const bcryptjs = require('bcryptjs');

const jwt = require('jsonwebtoken');


// Registration.. 

router.post("/user/registration", async (req, res) => {
    const { firstName, lastName, email, password , phone, countries , address ,town,postcode } = req.body
    try {

        // checking mandatory fields
        if (!firstName || !lastName || !email ||  !password || !phone || !countries || !address || !town || !postcode ) {
            res.status(400).json({
                status: false,
                message: " All fields are mandotary "
            })
            return
        };

        const user = await User.find({ email: email });
        console.log("user",user)
        if (user.length != 0) {
            return res.status(400).json({
                status: false,
                message: "User is already registered"
            })
        }
        const hanshPassword = await bcryptjs.hash(password, 10)
        const newUser = await User.create({
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "phone": phone,
            "password": hanshPassword,
            "countries":countries,
            "address": address,
            "town": town,
            "postcode": postcode

        })
        res.status(201).json({
            status: true,
            message: "user created successfully"
        })
        

    } catch (e) {
        console.log("Error while registration", e.message);
        res.status(500).json({
            status: false,
            message: "Internal server error"
        })
    }

})

//Login ..

router.post("/user/login", async (req, res) => {

    try {
        const { email, password } = req.body;

        // Checking mandotory fields

        if (!email || !password) {
            res.status(400).json({
                status: false,
                message: "please provide email or password"
            })
            return
        }

        const user = await UserLogin.find({ email: email });
        console.log(user)

        if (!user[0]) {
            res.status(400).json({
                status: false,
                message: "User is not registered !"
            })
            return
        }

        const isValid = await bcryptjs.compare(password, user[0].password);

        console.log("isvalid", isValid)
        if (isValid) {


            const token = await jwt.sign({ userId: user[0]._id }, "secret")

            res.status(200).json({
                status: true,
                message: "User Login succesfully",
                token: token
            })
        } else {
            res.status(400).json({
                status: false,
                message: "inValid password"
            })
        }

    } catch (e) {
        console.log("Error while login", e.message);
        res.status(500).json({
            status: false,
            message: "Internal server Error"
        })

    }
})

//Profile ..

router.post("/user/profile" , async (req,res)=>{
    try {
        
        const token = req.headers.token 

        await jwt.verify(token, "secret",(async (e, decodedData)=>{
            if(e){
                res.status(400).json({
                    status : false , 
                    message : " invalid Token "
                })
            }
            else{
                const user = await User.findById(decodedData.userId)

                const userSpecificData ={
                    firstName : user.firstName,
                    lastName:  user.lastName,
                    email:  user.email,
                    phone:  user.phone,
                    countries: user.countries,
                    address:  user.address,
                    town:  user.town,
                    postcode:  user.postcode
                }
                res.status(200).json({
                    status : true ,
                    message : `User data fetched successfuly`,
                    data : userSpecificData
                })
            }
        }))

        // console.log(" Decodeb Data ", decodedData);

    } catch (e) {
        console.log("Error getting user profile  ", e.message);
        res.status(500).json({
            status : false ,
            message : 'some server Error '
        })
        
    }
})


module.exports = router