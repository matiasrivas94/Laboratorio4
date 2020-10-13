'use strict'

const express = require('express');
const archiveCtrl = require('../controllers/archive');
const userCtrl = require('../controllers/auth');
const auth = require('../middlewares/auth');
const api = express.Router();

api.post('/signin', userCtrl.signIn);
api.post('/signup', userCtrl.signUp);

api.post('/archive', auth, archiveCtrl.uploadFile);
api.get('/archive/find/:fileName', auth, archiveCtrl.searchFile);
api.delete('/archive/:fileID', auth, archiveCtrl.deleteFile);
api.get('/archive/info/:fileID', auth, archiveCtrl.getFile);
api.get('/archive', auth, archiveCtrl.getFiles);
api.get('/archive/file/:fileID', archiveCtrl.downloadFile);
api.put('/archive/:fileID', auth, archiveCtrl.updateFile);


api.get('/private', auth, function (req, res){
    res.status(200).send({message: 'You have access'});
})
module.exports = api;