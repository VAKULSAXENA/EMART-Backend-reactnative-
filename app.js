const express=require('express');
const app=express();
const morgan=require('morgan');
const mongoose=require('mongoose');
const cors=require('cors');
const Product=require('./models/product')
const productRouter=require('./routers/products')
const categoriesRouter=require('./routers/categories')
const ordersRouter=require('./routers/orders')
const usersRouter=require('./routers/users')
require('dotenv/config');
app.use(cors());
app.options('*',cors());
const api=process.env.API_URL;

//middleware
app.use(express.json());
app.use(morgan('tiny'));

//routers
app.use(`${api}/products`,productRouter)
app.use(`${api}/categories`,categoriesRouter)
app.use(`${api}/orders`,ordersRouter)
app.use(`${api}/users`,usersRouter)



mongoose.connect(process.env.Mongo_URL)
    .then(()=>{
        console.log('Database is ready...')
    })
    .catch((err)=>{
        console.log(err);
    })

app.listen(3000,()=>{
    console.log('Server running at port 3000');
})