const express = require("express");
const router = express.Router()
const AdminLogin = require("../models/AdminLogin")

// const bcryptjs = require('bcryptjs');

const jwt = require('jsonwebtoken');


//Login ..

router.post("/admin/login", async (req, res) => {

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
        const user = await AdminLogin.find({ email: email });
        // const isValid = await bcryptjs.compare(password, user[0].password);

        let isValid = false
        if (password === user[0]?.password) {
            isValid = true
        }

        console.log("isvalid", isValid)
        if (isValid) {


            const token = await jwt.sign(
                {
                    admin: user[0]._id,
                    role: "admin"
                },
                "secret")

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

router.post("/admincreate", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                status: false,
                message: "please provide email or password"
            })
            return
        }
        const user = await AdminLogin.find({ email: email });
        console.log("user", user)
        if (user[0]) {
            res.status(400).json({
                status: false,
                message: "User is already registered !"
            })
            return
        }
        const newUser = new AdminLogin({
            email: email,
            password: password
        })
        await newUser.save()
        res.status(200).json({
            status: true,
            message: "User registered successfully"
        })
    } catch (e) {
        console.log("Error while login", e.message);
        res.status(500).json({
            status: false,
            message: "Internal server Error"
        })
    }

})

module.exports = router
