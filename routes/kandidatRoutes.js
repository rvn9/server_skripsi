const express = require('express');
const router = express.Router();
const kandidatModel = require('../models/kandidatModel')
const pemilihModel = require('../models/pemilihModel')
const dprModel = require("../models/dprModel")
const dpdModel = require("../models/dpdModel")
const dprd_provinsi_model = require("../models/dprdProvinsiModel")
const dprd_kabupaten_model = require("../models/dprdKabupatenModel")


//ROUTES 
router.get('/', (req,res) => {
    res.send("TEST PRESIDEN")
})

// //get specific kandidat//
// router.get('/get_specific_kandidat/:id', async (req,res) => {
//     try{
//         const specificKandidat = await kandidatModel.find({_id: req.params.id});
//         if(specificKandidat == 0){
//             res.json({message: "Kandidat not found."});
//         }else{
//             res.send(specificKandidat);
//         }
//     }catch(err){
//         res.json({message: err});
//     }
// })

//return all kandidat//
router.get('/get_all_kandidat', async (req,res) => {
    try{
        const allKandidat = await kandidatModel.find();
        if(allKandidat == 0){
            res.json({message:"Tidak ada data kandidat yang tersedia"})
        }else{
           res.json(allKandidat);
        }
    }catch (err){
        res.json({message:err})
    }
})

//updata data kandidat//
router.patch('/update_data_kandidat/', async (req,res) => {
    try{
        const updateUser = await kandidatModel.updateOne({_id: req.body.kandidatID}, {
            // update data here //
            $set:{
                Nomor_urut_pasangan: req.body.Nomor_urut_pasangan,
                Calon_presiden: req.body.Calon_presiden,
                Calon_wakil_presiden: req.body.Calon_wakil_presiden,
                Partai_pendukung: req.body.Partai_pendukung,
            }
        });
    

        if(updateUser.n === 0){
            res.json({message: "Failed to update data, please check again."});
        }else{
            res.json({message: "Data kandidat berhasil diubah"})
        }
    }catch(err){
        res.json({message:err})
    }
})

// insert new kandidat // 
router.post('/add_new_kandidat', async (req,res) => {
    const dataKandidat = new kandidatModel({
        Nomor_urut_pasangan: req.body.Nomor_urut_pasangan,
        Calon_presiden: req.body.Calon_presiden,
        Calon_wakil_presiden: req.body.Calon_wakil_presiden,
        Partai_pendukung: req.body.Partai_pendukung,
        Jumlah_suara: 0
    });

    try{
        const newKandidat = await dataKandidat.save();
        res.json(newKandidat);
    }catch(err){
        res.json({message: err});
    }
})

// delete kandidat // 
router.delete('/delete_kandidat/', async (req,res) => {
    try{
        const deletedKandidat = await kandidatModel.deleteOne({_id: req.body.id});
        if(deletedKandidat.deletedCount === 0){
            res.json({message: "Data yang ingin dihapus tidak ditemukan, silahkan coba lagi."});
        }else{
            res.json({message: "Data kandidat berhasil dihapus."});
        }
    }catch (err){
        res.json({message:err});
    }
})

// cast a vote // 
router.patch('/vote', async(req,res) => {
    console.log(req.body);
    try{
        const updateKandidat = await kandidatModel.updateOne(
            { _id: req.body.Id_presiden },
            {
              $inc: { Jumlah_suara: 1 },
            }
        );
        
        // vote dpr //
        if(req.body.dprType =="parpol"){
            const updateDPR = await dprModel.updateOne(
                { _id: req.body.Id_dpr},
                {
                  $inc: { Jumlah_suara: 1 },
                }
            );
        }else if(req.body.dprType =="individu"){
            const updateDPR = await dprModel.updateOne(
                { "Calon_dpr._id": req.body.Id_dpr},
                {
                  $inc: { "Calon_dpr.$.Jumlah_suara": 1 },
                }
            );
        }

        // vote dpd //
        const updateDpd = await dpdModel.updateOne(
            { _id: req.body.Id_dpd },
            {
              $inc: { Jumlah_suara: 1 },
            }
        );
            
         // vote DPRD Kabupaten //
         if(req.body.dprdKabupatenType =="parpol"){
            const updateDprdKabupaten = await dprd_kabupaten_model.updateOne(
                { _id: req.body.Id_dprd_kabupaten},
                {
                  $inc: { Jumlah_suara: 1 },
                }
            );
        }else if(req.body.dprdKabupatenType =="individu"){
            const updateDprdKabupaten = await dprd_kabupaten_model.updateOne(
                { "Calon_dprd_kabupaten._id": req.body.Id_dprd_kabupaten},
                {
                  $inc: { "Calon_dprd_kabupaten.$.Jumlah_suara": 1 },
                }
            );
        }


        // vote DPRD Provinsi //
        if(req.body.dprdProvinsiType =="parpol"){
            const updateDprdProvinsi = await dprd_provinsi_model.updateOne(
                { _id: req.body.Id_dprd_provinsi},
                {
                  $inc: { Jumlah_suara: 1 },
                }
            );
        }else if(req.body.dprdProvinsiType =="individu"){
            const updateDprdProvinsi = await dprd_provinsi_model.updateOne(
                { "Calon_dprd_provinsi._id": req.body.Id_dprd_provinsi},
                {
                  $inc: { "Calon_dprd_provinsi.$.Jumlah_suara": 1 },
                }
            );
        }


        const updatePemilih = await pemilihModel.updateOne({TagID: req.body.TagID}, {
            // update data here //
            $set:{
               Is_readed: true
            }
        });
        
        res.json({message:"success"})

    }catch(err){
        console.log(err);
        res.json({message:err})
    }
})


module.exports = router;