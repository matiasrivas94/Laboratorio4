'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');

const createToken = (auth) =>{
    const payload = {
        sub: auth._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix(),
    }
    return jwt.encode(payload, config.SECRET_TOKEN);
}

const decodeToken = (token) =>{
    const decode = new Promise((resolve, reject)=>{
        try{
            const payload = jwt.decode(token, config.SECRET_TOKEN);   
            if(payload.exp <= moment().unix()){
                reject({
                    status: 401,
                    message: 'The Token has expired'
                });
            }
            resolve(payload.sub);
        }catch(err){
            reject({
                status: 500,
                message: 'Invalid Token'
            })
        }
    })
    return decode;
}

module.exports = {
    createToken,
    decodeToken
}