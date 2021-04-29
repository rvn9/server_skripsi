const express = require('express');
const router = express.Router();
const dprModel = require('../models/dprModel');

//ROUTES 
router.get('/', (req,res) => {
    res.send("TEST DPR")
})

//return all dpr//
router.get('/get_all', async (req,res) => {
    try{
        const allDpr = await dprModel.find();
        if(allDpr == 0){
            res.json({message:"Tidak ada data dpr yang tersedia"})
        }else{
           res.json(allDpr);
        }
    }catch (err){
        res.json({message:err})
    }
})

// create new dpr // 
router.post('/add_new', async(req,res) => {

    const dataDpr = new dprModel({
        Parpol: req.body.Parpol,
        Calon_dpr : req.body.Data
    });

    try{
        const newDpr = await dataDpr.save();
        res.json(newDpr);
    }catch(err){
        res.json({message: err});
    }
})





module.exports = router;