
const {Category} = require('../models/category');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    try {
    const categoryList = await Category.find();
    } catch (error) {
    if(!categoryList) {
        res.status(500).json({success: false})
    }}
    res.status(200).send(categoryList);
})

router.get('/:id', async(req,res)=>{
    try {
        const category = await Category.findById(req.params.id);
    } catch (error) {
    if(!category) {
        res.status(500).json({message: 'The category with the given ID was not found.'})
    }}
    res.status(200).send(category);
})



router.post('/', async (req,res)=>{
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    try {
    category = await category.save();
    } catch (error) {
    console.log('well...')
    // if(!category)
    // return res.status(400).send('the category cannot be created!')
    }
    res.send(category);
})


router.put('/:id',async (req, res)=> {
    try {
        const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon || category.icon,
            color: req.body.color,
        },
        { new: true}
    )} catch (error) {

    if(!category)
    return res.status(400).send('the category cannot be created!')
    }
    res.send(category);
})

router.delete('/:id', (req, res)=>{
    Category.findByIdAndRemove(req.params.id).then(category =>{
        if(category) {
            return res.status(200).json({success: true, message: 'the category is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "category not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

module.exports =router;