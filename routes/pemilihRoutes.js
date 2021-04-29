const express = require('express');
const router = express.Router();
const pemilihModel = require('../models/pemilihModel')

//ROUTES 
router.get('/', (req,res) => {
    res.send("TEST PEMILIH")
})

// get data pemilih // 
router.post('/get_data_pemilih', async (req,res) => {
    
    try{
        const specificPemilih = await pemilihModel.find({TagID: req.body.TagID});
        if(specificPemilih == 0){
            res.send({response:"ERROR"});
        }else{
            res.send({response:"OK", data:specificPemilih});
        }
    }catch(err){
        res.json({message: err});
    }
})

// create new pemilih // 
router.post('/add_new_pemilih', async(req,res) => {
    
    const dataPemilih = new pemilihModel({
        TagID: req.body.TagID,
        Privilege: "user"
    });

    try{
        const newPemilih = await dataPemilih.save();
        res.json(newPemilih);
    }catch(err){
        res.json({message: err});
    }
})

// cast a vote // 
router.post('/vote', async(req,res) => {
    try{
        const updatePemilih = await pemilihModel.updateOne({TagID: req.body.TagID}, {
            // update data here //
            $set:{
                Data : req.body.Data,
                Hash_value: req.body.Hash,
                Is_voted: true
            }
        });
    

        if(updatePemilih.n === 0){
            res.json({message: "Failed to update data, please check again."});
        }else{
            res.json({message: "Successfully update data."})
        }
    }catch(err){
        res.json({message:err})
    }
})

router.patch('/set_state', async(req,res) => {
    try{
       
        var kategori = "Is_saved." + req.body.Kategori;
        // set kalo kartu pemilih sudah di baca //
        const updatePemilih = await pemilihModel.updateOne({TagID: req.body.TagID}, {
            // update data here //
            $set:{
                [kategori] : true
            }
        });
    

        if(updatePemilih.n === 0){
            res.json({message: "Failed to update data, please check again."});
        }else{
            res.json({message: "Successfully update data."})
        }
    }catch(err){
        res.json({message:err})
    }
})






module.exports = router;