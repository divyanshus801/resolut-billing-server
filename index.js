const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const path =require('path');


const Connection = async () => {
    try {   
        await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting with the database ', error);
    }
}
Connection();

// //imported Routes
const authRoute = require('./routes/auth');
const clientRoute = require('./routes/client');
const matterRoute = require('./routes/matter');
const lawyerRoute = require('./routes/lawyer');
const workHourRoute  = require('./routes/workHour');

//Middlewares
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/public',express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());
app.use(cors());


// //My Routes
app.use('/api',authRoute);
app.use('/api',clientRoute);
app.use('/api',matterRoute);
app.use('/api',lawyerRoute);
app.use('/api',workHourRoute);


//starting a server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
