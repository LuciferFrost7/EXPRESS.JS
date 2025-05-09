const fs = require("fs").promises
const path = require("path")
const {
    getAllCinemas,
    getCinema,
    addCinema,
    changeCinema,
    updateCinema,
    deleteCinema
} = require("../db/db.js");


exports.getAllCinemas = async (req, res, next) => {
    try{
        const result = await getAllCinemas(next);
        if(result['status'] === 200){
            res.status(200);
            res.json(result['content']);
        }
    }catch(err){
        err.status(500);
        next(err);
    }
}
exports.getCinema = async (req, res, next) => {
    try{
        const id = req.params.id;
        const result = await getCinema(id, next);
        if(result['status'] === 200){
            res.status(200);
            res.json(result['content']);
        }else if(result['status'] === 404){
            res.status(404);
            res.json(result['content']);
        }
    }catch(err){
        err.status(500);
        next(err);
    }
}

exports.addCinema = async (req, res, next) => {
    try{
        10 / 0;
    }catch(err){
        err.status(500);
        next(err);
    }
}

exports.changeCinema = async (req, res, next) => {
    try{
        10 / 0;
    }catch(err){
        err.status(500);
        next(err);
    }
}

exports.updateCinema = async (req, res, next) => {
    try{
        10 / 0;
    }catch(err){
        err.status(500);
        next(err);
    }
}

exports.deleteCinema = async (req, res, next) => {
    try{
        10 / 0;
    }catch(err){
        err.status(500);
        next(err);
    }
}