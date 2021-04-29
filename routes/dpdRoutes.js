const express = require('express');
const router = express.Router();
const dpdModel = require('../models/dpdModel');

//ROUTES 
router.get('/', (req,res) => {
    res.send("TEST DPD")
})

//return all dpr//
router.get('/get_all', async (req,res) => {
    try{
        const allDpd = await dpdModel.find();
        if(allDpd == 0){
            res.json({message:"Tidak ada data dpr yang tersedia"})
        }else{
           res.json(allDpd);
        }
    }catch (err){
        res.json({message:err})
    }
})

// create new dpr // 
router.post('/add_new', async(req,res) => {

    const dataDpd = new dpdModel({
        Nama: req.body.Nama,
        Nomor_urut : req.body.Nomor_urut,
    });

    try{
        const newDpd = await dataDpd.save();
        res.json(newDpd);
    }catch(err){
        res.json({message: err});
    }
})





module.exports = router;