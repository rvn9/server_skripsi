// mongodb driver
const mongoose = require('mongoose');

const PemilihSchema = mongoose.Schema({
    TagID : {
        type: String,
        required: true
    },
    Privilege: {
        type: String,
        required: true
    },
    Data:{
        type: String,
    },
    Hash_value:{
        type: String,
    },
    Is_voted: {
        type: Boolean,
        default: false,
    },
    Is_readed: {
        type: Boolean,
        default: false,
    },
    Is_saved : {
        presiden : {
            type: Boolean,
            default: false,
        },
        dpr_ri : {
            type: Boolean,
            default: false,
        },
        dpd_ri :{
            type: Boolean,
            default: false,
        },
        dprd_provinsi:{
            type: Boolean,
            default: false,
        },
        dprd_kabupaten:{
            type: Boolean,
            default: false,
        }
    }

}, {collection: 'data_pemilih', versionKey: false} ) // collection name // version (__v":0) key false // 

module.exports = mongoose.model('pemilihModel', PemilihSchema);

