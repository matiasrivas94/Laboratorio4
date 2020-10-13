'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//mongoose.set('useCreateIndex', true);

const authSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        trim: true,
        unique: true
      },
      password: {
        type: String,
        required: true,
        trim: true,
        select:false
      }
    },
    {
        timestamps: true
    });
    
module.exports = mongoose.model('Auth', authSchema);
//module.exports = userSchema;