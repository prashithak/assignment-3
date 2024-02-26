const express=require('express');
const morgan=require('morgan');
const fs=require('fs');
require('dotenv').config();
const routerfile = require('/routes/basicroute');



const app = new express();
app.use(morgan('dev'));


const PORT=process.env.PORT;


app.use('/list',routerfile);



app.listen(PORT,(req,res)=>{
    console.log(`server is listening on ${PORT}`);
})