const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
require('dotenv/config');
const Product=require('../models/product')
const api=process.env.API_URL;



router.get('/',async(req,res)=>{

    //localhost:3000/api/v1/products?categories='a','b'

    let filter={}
    if(req.query.categories)
    {
        filter={category:req.query.catergories.split(',')}
    }

       const productList= await Product.find(filter);

    // let filter=[]
    // if(req.query.categories)
    // {
    //     filter=req.query.catergories.split(',')
    // }

    //    const productList= await Product.find({category:filter});
    // const productList= await Product.find().select('name image -_id');
    // const productList= await Product.find().populate('product');
    res.send(productList);
    
})

router.get('/get/count',async(req,res)=>{

       const productCount= await Product.countDocuments();
    // const productList= await Product.find().select('name image -_id');
    // const productList= await Product.find().populate('product');
    res.send({productCount:productCount});
    
})

router.get('/get/featured/:count',async(req,res)=>{
        const count=req.params.count? req.params.count:0
        console.log(count)
       const products= await Product.find({isFeatured:true}).limit(+count);
    // const productList= await Product.find().select('name image -_id');
    // const productList= await Product.find().populate('product');
    res.send(products);
    
})
router.post('/',async(req,res)=>{

    let product=await Category.findById(req.body.product);
    if(!product) return res.status(400).send('Invalid Category')

   product=new Product({
    name:req.body.name,
    description:req.body.description,
    richDescription:req.body.richDescription,
    image:req.body.image,
    brand:req.body.brand,
    price:req.body.price,
    product:req.body.product,
    countInStock:req.body.countInStock,
    rating:req.body.rating,
    isFeatured:req.body.isFeatured
   })

   product = await product.save();
   if(!product){
    return res.status(500).send("The product cannot be created")
   }
   res.send(product);
//    await product.save().then((createdProduct)=>{
//     res.status(201).json(createdProduct)
//    })
//    .catch((err)=>{
//     res.status(500).json({
//         error:err,
//         success:false
//     })
//    })
   
})

router.put('/:id',async(req,res)=>{

    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(500).json({message:'Invalid ID'})
    }
    const product=await Product.findByIdAndUpdate(
        req.params.id,
        {
            name:req.body.name,
            description:req.body.description,
            richDescription:req.body.richDescription,
            image:req.body.image,
            brand:req.body.brand,
            price:req.body.price,
            product:req.body.product,
            countInStock:req.body.countInStock,
            rating:req.body.rating,
            isFeatured:req.body.isFeatured
        },
        {new:true}
        );

    if(!product){
        res.status(500).json({message:'The product with the given ID not found'});
    }
    res.status(200).send(product)
})

module.exports=router