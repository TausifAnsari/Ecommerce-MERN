const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// import routes
const userRoutes = require('./routes/user')

//app
const app = express();

//database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser:true
}).then(() => console.log("MongoDB Database Connected"));

//midlleware
app.use(morgan('dev'))
//app.use(bodyParser.json())
app.use(express.json());
app.use(cookieParser());


//routes middleware
app.use('/api', userRoutes)

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});