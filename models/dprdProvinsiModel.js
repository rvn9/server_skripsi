// mongodb driver
const mongoose = require('mongoose');

const subDprdProvinsiSchema = mongoose.Schema({
    Nama_calon : {
        type: String,
        require: true,
    },
    Jumlah_suara : {
        type: Number,
        default: 0
    }
})

const DprdProvinsiSchema = mongoose.Schema({
    Parpol: {
        type: String,
        required: true
    },
    Jumlah_suara: {
        type: Number,
        default: 0
    },
    Calon_dprd_provinsi : [subDprdProvinsiSchema]

}, {collection: 'data_dprd_provinsi', versionKey: false} ) // collection name // version (__v":0) key false // 

module.exports = mongoose.model('dprd_provinsi_model', DprdProvinsiSchema);

