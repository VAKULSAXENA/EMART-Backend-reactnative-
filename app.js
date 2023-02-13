const express=require('express');
const app=express();

require('dotenv/config');

const api=process.env.API_URL;

app.get('/',(req,res)=>{
    res.send("WELCOME TO EMART")
})

app.listen(3000,()=>{
    console.log(api)
    console.log('Server running at port 3000');
})