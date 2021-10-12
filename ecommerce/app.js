const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

//app
const app = express();

//database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser:true
}).then(() => console.log("MongoDB Database Connected"));

//routes
app.get("/", (req, res) => {
    res.send("Hello From Node Updated");
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});