const express = require("express")
const app = express();
require("dotenv").config();
const connection = require("./config/connection");

app.use(express.json());

const start = ()=>{
    try {
        connection(process.env.MONGO_URI);
        app.listen( process.env.PORT || 5000, ()=>console.log("Server is running at port 5000........."));
    } catch (error) {
        console.log(error);
    }
}
start();