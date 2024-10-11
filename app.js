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
    origin: 'https://keen-smakager-2e36df.netlify.app',  // Replace with your Next.js frontend URL
    credentials: true  // Allows cookies to be sent
  }));


app.use('/api/v1/data', dataRoute);
app.use('/api/v1/order', orderRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/profit', profitRoute);

module.exports = app;