const express = require('express');
const router = express.Router();
const dprdProvinsiModel = require('../models/dprdProvinsiModel');

//ROUTES 
router.get('/', (req,res) => {
    res.send("TEST DPRD PROVINSI")
})

//return all dpr//
router.get('/get_all', async (req,res) => {
    try{
        const allDprdProvinsi = await dprdProvinsiModel.find();
        if(allDprdProvinsi == 0){
            res.json({message:"Tidak ada data dpr yang tersedia"})
        }else{
           res.json(allDprdProvinsi);
        }
    }catch (err){
        res.json({message:err})
    }
})

// create new dpr // 
router.post('/add_new', async(req,res) => {

    const dataDprdProvinsi = new dprdProvinsiModel({
        Parpol: req.body.Parpol,
        Calon_dprd_provinsi : req.body.Data
    });

    try{
        const newDprdProvinsi = await dataDprdProvinsi.save();
        res.json(newDprdProvinsi);
    }catch(err){
        res.json({message: err});
    }
})





module.exports = router;