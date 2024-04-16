
const express = require("express")
const app = express();
const port = 4000 || process.env.PORT;
const dbConnection = require('./connections/dbConnection');

// connect to database
dbConnection();

// home route 
app.get("/", (req, res) => {
    res.send("Welcome to Ecommerce Backend")
})

// listen to port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

