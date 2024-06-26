
const express = require("express")
const app = express();
const port = 4000 || process.env.PORT;
const dbConnection = require('./connections/dbConnection');

// connect to database
dbConnection();

const userRouter = require("./routes/user");

const ProductDetails = require("./routes/product_details")

const Admin_login = require("./routes/adminlogin")

const bodyParser = require('body-parser')

//cors ...
const cors = require("cors")

// create application/json parser
app.use(bodyParser.json());

//cors ...
app.use(cors())


// home route 
app.get("/", (req, res) => {
    res.send("Welcome to Ecommerce Backend")
})

app.use(userRouter);

app.use(ProductDetails)

app.use(Admin_login)

// listen to port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

