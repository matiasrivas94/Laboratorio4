'use strict'
const service = require('../services');

const isAuth = (req, res, next)=>{
    if(!req.headers.authorization) return res.status(403).send({message:'You do not have authorization'});

    const token = req.headers.authorization.split(" ")[1];

    if(token != 'null'){
        service.decodeToken(token)
        .then((response)=>{
            req.user = response;
            next();
        })
        .catch((response) =>{
            res.status(response.status).send({message: response.message});
        });    
    }else{
        res.status(401).send({message: 'You must log in'});
    }
}

module.exports = isAuth;