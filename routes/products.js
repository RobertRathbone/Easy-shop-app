const {Product} = require('../models/product');
const express = require('express');
const {Category} = require('../models/category');
const mongoose = require('mongoose');
const { query } = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
    //localhost:300/api/v1/products?categories=60f8c9cbbe9ca005e5c70ee4,60fef817a323de278c163f83
    let filter = {};
    if (req.query.categories)
    {
        filter = {category: req.query.categories.split(',')}
    }
    const productList = await Product.find(filter);
    if(!productList) {
        res.status(500).json({success : false})
    }
    res.send(productList);
})

// use .select to return a shorter JSON
// router.get(`/`, async (req, res) => {
//     const productList = await Product.find().select('name image -id');
//     if(!productList) {
//         res.status(500).json({success : false})
//     }
//     res.send(productList);
// })

router.get(`/:id`, async (req, res) => {

    const product = await Product.findById(req.params.id).populate('category');
    if(!product) {
        res.status(500).json({success : false})
    }
    res.send(product);
})

router.post(`/`, async (req, res) => {
    const category = await (req.body.category);
    console.log(req.body.category);
    if (!category) return res.status(400).send('Invalid Category');

        const product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDesrciption: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    })
    try {
    product = await product.save();
    } catch (error) {
    if (!product)
    return res.status(500).send('The product cannot be created');
    }
    res.send(product);
});

router.put(`/:id`, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Invalid Product Id')
    }
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Invalid Category');

        const product = await Product.findByIdAndUpdate( 
            req.params.id,
            {
        name: req.body.name,
        description: req.body.description,
        richDesrciption: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    })
    try {
    product = await product.save();
    } catch (error) {
    if (!product)
    return res.status(500).send('The product cannot be created');
    }
    res.send(product);
});

router.delete('/:id', (req, res)=>{
    Product.findByIdAndRemove(req.params.id).then(product =>{
        if(product) {
            return res.status(200).json({success: true, message: 'the product is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "product not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

router.get(`/get/count`, async (req, res) => {
    const productCount = await Product.countDocuments((count) => count)
    if(!productCount) {
        res.status(500).json({success : false})
    }
    res.send({count: productCount});
})

router.get(`/get/featured/:count`, async (req, res) => {
    const count = req.params.count ? req.params.count : 0
    const products = await Product.find({isFeatured:true}).limit(+count)
    if(!products) {
        res.status(500).json({success : false})
    }
    res.send(products);
})

module.exports =router;
