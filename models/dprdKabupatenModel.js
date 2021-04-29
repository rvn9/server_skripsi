// mongodb driver
const mongoose = require('mongoose');

const subDprdKabuppatenSchema = mongoose.Schema({
    Nama_calon: {
        type: String,
        require: true,
    },
    Jumlah_suara : {
        type: Number,
        default: 0
    }
})

const DprdKabupatenSchema = mongoose.Schema({
    Parpol: {
        type: String,
        required: true
    },
    Jumlah_suara : {
        type: Number,
        default: 0
    },
    Calon_dprd_kabupaten : [subDprdKabuppatenSchema]

}, {collection: 'data_dprd_kabupaten', versionKey: false} ) // collection name // version (__v":0) key false // 

module.exports = mongoose.model('dprd_kabupaten_model', DprdKabupatenSchema);

