'use strct'

const mongoose = require('mongoose');
const Auth = require('../models/auth');
const service = require('../services');
const fs = require('fs');
const crypto = require('crypto');
const SECRET_KEY = 'secretkey123456';

const signIn = (req, res) =>{
    Auth.findOne({ email: req.body.email }).select('password').exec((err, auth) =>{
        if(err) return res.status(500).send({message: `There was an error searching for the user: ${err}`});
        if(!auth) return res.status(404).send({message: 'User does not exist'});

        let passwordFields = auth.password.split('$');
        let salt = passwordFields[0];
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");

        if (hash === passwordFields[1]) {
            res.status(200).send({token: service.createToken(auth)});
        }
        else return res.status(401).send({message:'Wrong Password'});
    });
}

const signUp = (req, res) =>{
    const auth = new Auth();

    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512',salt).update(req.body.password).digest("base64");

    req.body.password = salt + "$" + hash;
        
    auth.name =  req.body.name;
    auth.email = req.body.email;
    auth.password = req.body.password;

    auth.save(err =>{
        if(err) return res.status(500).send({message: `Failed to create user: ${err}`});
        fs.mkdir('upload/' +  auth._id, err => {
            if(err) return res.status(500).send({message: `Error trying to create user folder: ${err}`});
            
            return res.status(201).send({token: service.createToken(auth)});
        });
    });
}

module.exports = {
    signUp,
    signIn
}