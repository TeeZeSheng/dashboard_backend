const app = require('./app.js')
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({path: './config.env'});

const PORT = 8080;

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);



app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
    
});

mongoose.connect(DB, {
  
}).then(con => {
  
  console.log("connected to database");
})