'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;
const auths = require('./auth');

const archiveSchema = schema({
    name: {
        type: String,
        required: true,
        trim: true
      },
    size: {
        type: Number,
        required: true,
        trim: true
      },
    type: {
        type: String,
        required: true,
        trim: true
      },
    location: {
        type: String,
        required: true,
        trim: true
      },
    add_Date: {
        type: String,
        required: true,
        trim: true
      },
    auth: { type: schema.ObjectId, ref: 'Auth'}
});

module.exports = mongoose.model('Archive', archiveSchema);