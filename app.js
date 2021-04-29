const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');

// .env confic //
require('dotenv').config();


// import routes //
const pemilihRoutes = require("./routes/pemilihRoutes")
const kandidatRoutes = require("./routes/kandidatRoutes")
const dprRoutes = require("./routes/dprRoutes")
const dpdRoutes = require("./routes/dpdRoutes")
const dprdProvinsiRoutes = require('./routes/dprdProvinsiRoutes')
const dprdKabupatenRoutes = require('./routes/dprdKabupatenRoutes')

// middleware/
app.use(cors());
app.use(bodyParser.json());
app.use('/endpoint/pemilih/', pemilihRoutes);
app.use('/endpoint/presiden/', kandidatRoutes);
app.use('/endpoint/dpr/', dprRoutes);
app.use('/endpoint/dpd/', dpdRoutes);
app.use('/endpoint/dprd_provinsi',dprdProvinsiRoutes);
app.use('/endpoint/dprd_kabupaten',dprdKabupatenRoutes);



// db connect // 
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology:true } , () => {
    console.log("CONNECTED TO DB !!")
})
app.listen(3000)