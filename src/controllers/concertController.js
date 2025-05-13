const fs = require("fs").promises
const path = require("path")

const {
    getAllConcerts,
    getConcert,
    addConcert,
    changeConcert,
    updateConcert,
    deleteConcert
} = require("../db/db.js");

const{
    toNormalConcertId,
    isConcertBody
} = require("../services/mutableService.js")


exports.getAllConcerts = async (req, res, next) => {
    try{
        const result = await getAllConcerts(next);
        if(result['status'] === 200){
            res.status(200);
            res.json(result['content']);
        }
    }catch(err){
        err.status(500);
        next(err);
    }
}

exports.getConcert = async (req, res, next) => {
    try{
        const id = req.params.id;
        const result = await getConcert(id, next);
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

exports.addConcert = async (req, res, next) => {
    try{
        const body = req.body;
        const result = await isConcertBody(body);
        if(result['status'] === 400){
            res.status(400);
            res.json(result['content'])
        }else if(result['status'] === 200) {
            const response = await addConcert(body, next);
            if(response['status'] === "201"){
                res.status(201);
                res.json({"message": "Object concert successfully added to database"});
            }else if(response['status'] === "500"){
                res.status(500);
                res.json(response['content']);
            }
        }
    }catch(err){
        err.status = 500;
        next(err);
    }
}

exports.changeConcert = async (req, res, next) => {
    try{
        const id = req.params.id;
        const body = req.body;
        const result = await isConcertBody(body);
        if(result['status'] === 400){
            res.status(400);
            res.json(result['content'])
        }else if(result['status'] === 200) {
            const response = await changeConcert(id, body, next);
            if(response['status'] === 200){
                res.status(200);
                res.json({"message": "Object concert successfully changed on database"});
            }else{
                res.status(response['status']);
                res.json(response['content']);
            }
        }
    }catch(err){
        err.status(500);
        next(err);
    }
}

exports.updateConcert = async (req, res, next) => {
    try{
        const id = req.params.id;
        let a = await updateConcert(id, next);
        res.status(a['status']);
        res.json(a['content'])
    }catch(err){
        err.status(500);
        next(err);
    }
}

exports.deleteConcert = async (req, res, next) => {
    try{
        const id = req.params.id;
        const a = await deleteConcert(id, next);
        res.status(a['status']);
        res.json(a['content']);
    }catch(err){
        err.status = 500;
        next(err);
    }
}