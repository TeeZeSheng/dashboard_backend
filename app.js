const express = require('express');
const session = require('express-session')
const app = express ();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const dataRoute = require('./routes/dataRoute');
const orderRoute = require('./routes/orderRoute');
const authRoute = require('./routes/authRoute');
const profitRoute = require('./routes/profitRoute');


app.use(express.json());
app.use(cors({
  origin: true, 
  credentials: true  
}));


app.use('/api/v1/data', dataRoute);
app.use('/api/v1/order', orderRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/profit', profitRoute);

module.exports = app;