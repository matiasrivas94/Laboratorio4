'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

//{ useNewUrlParser: true } , collection.ensureIndex -> Problemas que persisten
mongoose.connect(config.db,{ useUnifiedTopology: true },(err, res)=>{
    if(err) console.log(`Error connecting to DataBase: ${err}`);
    console.log('Connection to DataBase completed');    
    app.listen(config.port, ()=>{
        console.log(`API REST PORT ${config.port}`);
    })
})