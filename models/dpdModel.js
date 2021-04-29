// mongodb driver
const mongoose = require('mongoose');

const DpdSchema = mongoose.Schema({
    Nama: {
        type: String,
        required: true
    },
    Nomor_urut : {
        type: String,
        require: true,
    },
    Wilayah:{
        type: String,
        require: true,
    },
    Jumlah_suara : {
        type: Number,
        default: 0
    }

}, {collection: 'data_dpd', versionKey: false} ) // collection name // version (__v":0) key false // 

module.exports = mongoose.model('dpdModel', DpdSchema);

