const express = require('express');
const router = express.Router();
const dprdKabupatenModel = require('../models/dprdKabupatenModel');

//ROUTES 
router.get('/', (req,res) => {
    res.send("TEST DPRD KABUPATEN")
})

//return all dpr//
router.get('/get_all', async (req,res) => {
    try{
        const allDprdKabupaten = await dprdKabupatenModel.find();
        if(allDprdKabupaten == 0){
            res.json({message:"Tidak ada data dpr yang tersedia"})
        }else{
           res.json(allDprdKabupaten);
        }
    }catch (err){
        res.json({message:err})
    }
})

// create new dpr // 
router.post('/add_new', async(req,res) => {

    const dataDprdKabupaten = new dprdKabupatenModel({
        Parpol: req.body.Parpol,
        Calon_dprd_kabupaten : req.body.Data
    });

    try{
        const newDprdKabupaten = await dataDprdKabupaten.save();
        res.json(newDprdKabupaten);
    }catch(err){
        res.json({message: err});
    }
})





module.exports = router;