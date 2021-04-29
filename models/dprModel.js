// mongodb driver
const mongoose = require('mongoose');

const subDprSchema = mongoose.Schema({
    Nama_calon : {
        type: String,
        require: true,
    },
    Jumlah_suara: {
        type: Number,
        default: 0
    }
})

const DprSchema = mongoose.Schema({
    Parpol: {
        type: String,
        required: true
    },
    Jumlah_suara : {
        type: Number,
        default: 0
    },
    Calon_dpr : [subDprSchema]

}, {collection: 'data_dpr', versionKey: false} ) // collection name // version (__v":0) key false // 

module.exports = mongoose.model('dprModel', DprSchema);

