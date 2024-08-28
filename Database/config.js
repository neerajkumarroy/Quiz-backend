require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("DataBase connect Successfully.....");
    })
    .catch((err) => {
        console.log("Somthing is wrong Please try gain....!", err);
    });