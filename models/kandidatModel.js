// mongodb driver
const mongoose = require('mongoose');

const KandidatSchema = mongoose.Schema({
    Nomor_urut_pasangan: {
        type: String,
        required: true
    },
    Calon_presiden : {
        type: Object,
        required: true
    },
    Calon_wakil_presiden: {
        type: Object,
        required: true
    },
    Partai_pendukung:{
        type: Array,
    },
    Jumlah_suara:{
        type: Number,
        default: 0
    }

}, {collection: 'data_kandidat', versionKey: false} ) // collection name // version (__v":0) key false // 

module.exports = mongoose.model('kandidatModel', KandidatSchema);

