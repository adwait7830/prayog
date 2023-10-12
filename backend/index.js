const express = require("express");
const connectDb = require("./config/dbConnection.js");
const dotenv = require("dotenv").config();

const server = express();
const port = process.env.PORT || 4000;

server.use(express.json());
server.use("/", require("./routes/routes.js"))

server.listen(port,() => {
    console.log(`Server is running!! on port ${port}`)
});