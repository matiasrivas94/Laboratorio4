'use strict'

const Archive = require('../models/archive');
const fs = require('fs');

const uploadFile = (req, res) =>{
    if(!req.files) 
        return res.status(500).send({message:'File Not Uploaded'});
    
    let archive = new Archive();
    let uploadedFiles = req.files.archives;
    let locations = './upload/' + req.auth + '/' + uploadedFiles.name;

    archive.name = uploadedFiles.name;
    archive.size = uploadedFiles.size;
    archive.type = uploadedFiles.mimeTipe;
    archive.location = locations;
    uploadedFiles.mv(locations);
    let date = new Date;
    archive.add_Date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    archive.add_Date += " " + date.getHours() + ":" + date.getMinutes();
    archive.auth = req.auth;

    archive.save((err, savedFiles)=>{
        if(err) 
            res.status(500).send({message: `Error saving to DataBase: ${err}`});
        res.status(200).send(savedFiles);
    });
}

const searchFile = (req, res) => {
    let archiveName = req.params.fileName;
    let expression = new RegExp(archiveName,'i');

    Archive.find({'name':expression, auth: req.user },(err, archives)=>{
        if(err) 
            return res.status(500).send({message: `Error when making the request: ${err}`});
        if(!archives) 
            return res.status(404).send({message: 'No file was found in the DataBase'});
        res.status(200).send(archives);
    });
}

const deleteFile = (req, res)=>{
    let archiveID = req.params.fileID;
    Archive.findById(archiveID, (err, archive)=>{
        if(err) 
            return res.status(500).send({message: `There was an error trying to delete from the file: ${err}`});
        if(!archive) 
            return res.status(404).send({message: 'File not found'});
        if(archive.auth = req.auth){
            archive.remove(err => {
                if(err)
                    return res.status(500).send({message: `There was an error trying to delete the file in the DataBase: ${err}`});
                fs.unlink(archive.location, (err)=>{
                    if(err)
                        return res.status(500).send({message:`There was an error trying to Delete the file on the server`});
                    res.status(200).send(archive);
                })
            })
        }
        else{
            return res.status(403).send({message: 'You do not have permissions to delete this file'});
        }
    })
}

const getFile = (req, res) =>{
    let archiveID = req.params.fileID;
    
    Archive.findById(archiveID, (err, archive)=>{
        if(err) 
            return res.status(500).send({message: `Error when making the request: ${err}`});
        if(!archive) 
            return res.status(404).send({message: 'The file does not exist in the DataBase'});
        if(archive.auth != req.auth)
             return res.status(403).send({message: 'You do not have the permissions to see the info of this file'});
        res.status(200).send(archive);
    });
};

const getFiles = (req, res) =>{
    let auth = req.auth;

    Archive.find({ user: user },(err, archives)=>{
        if(err)
            return res.status(500).send({message:`Error when making the request: ${err}`});
        if(!archives) 
            return res.status(404).send({message:'No saved files'});
        res.status(200).send(archives)
    });
};

const downloadFile = (req, res) =>{
    let archiveID = req.params.fileID;

    Archive.findById(archiveID, (err, archive)=>{
        if(err) 
            return res.status(500).send({message: `Error when making the request: ${err}`});
        if(!archive)
            return res.status(404).send({message: 'The file does not exist in the DataBase'});
        res.status(200).download(archive.location, (err)=>{
            if(err) 
                return res.status(404).send({message: `Failed to find the file in the directory: ${err}`})
        });
    });
}


/** 
 * NO FUNCIONA!! REVISAR 
*/
const updateFile = (req, res)=>{
    let archiveID = req.params.fileID;
    if(!req.files)
        return res.status(500).send({message:'File Not Uploaded'});

    Archive.findById(archiveID, (err, oldFile) => {
        if(err) 
            return res.status(404).send({message: `File not Found: ${err}`});
        if(oldFile.auth != req.auth) 
            return res.status(403).send({message: 'You do not have the permissions'});

        let replacementFile = req.files.archives;

        fs.unlink(oldFile.location, (err)=>{
            if(err) return res.status(500).send({message:`There was an error trying to Delete the file on the server`});

            let locations = './upload/' + req.user + '/' + replacementFile.name;
            let date = new Date();
            let fecha = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
            
            oldFile.name = replacementFile.name;
            oldFile.size = replacementFile.size;
            oldFile.type = replacementFile.mimeTipe;
            oldFile.location = locations;
            oldFile.add_Date = date;

            replacementFile.mv(locations);

            Archive.findByIdAndUpdate(archiveID, oldFile, (err,fileUpdated) =>{
                if(err) return res.status(500).send({message:`Error updating product: ${err}`});
                res.status(200).send({ fileUpdated });
            });
        });
    });
}

module.exports = {
    uploadFile,
    searchFile, 
    deleteFile,
    getFile,
    getFiles,
    downloadFile,
    updateFile
}