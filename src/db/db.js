const fs = require("fs").promises;
const path = require("path");

const{
    toNormalConcertId,
    isOneSense
} = require("../services/mutableService.js")



const dbPath = path.join(__dirname, './db.json');

exports.getAllConcerts = async (next) => {
    try{
        const dbContent = await fs.readFile(dbPath, 'utf-8');
        return {
            "status": 200,
            "content": JSON.parse(dbContent)['Концерты']
        };
    }catch(err){
        err.status = 500;
        next(err);
        return {
            "status": 500,
            "content": null
        }
    }
};

exports.getConcert = async (id, next) => {
    try{
        const dbContent = await fs.readFile(dbPath, 'utf-8');
        const concerts = JSON.parse(dbContent)['Концерты'];
        const concertId = toNormalConcertId(id);
        if(typeof concertId === "object"){
            return {
                "status": concertId.status,
                "content": null
            };
        }else{
            if(Object.keys(concerts).includes(concertId)){
                return {
                    "status": 200,
                    "content": concerts[concertId]
                };
            }else{
                 return {
                    "status": 404,
                    "content": null
                };
            }
        }
    }catch(err){
        if(!(err.status)){
            err.status = 500;
        }
        next(err);
        return {
            "status": 500,
            "content": null
        }
    }
};

exports.addConcert = async (body, next) => {
    try{
        let concerts = await fs.readFile(dbPath, 'utf-8');
        concerts = JSON.parse(concerts);
        const keys = Object.keys(concerts["Концерты"]);
        concerts["Концерты"][keys.length !== 0 ? toNormalConcertId(keys.length + 1) : "0"] = {
                "name": body['name'],
                "rate": body['rate'],
                "isFree": body['isFree'],
                "actors": body['actors'],
                "date": new Date()
        }
        let result = await fs.writeFile(dbPath, JSON.stringify(concerts, null, 4));
        return {
            "status": "201",
            "content": null
        }
    }catch(err){
        err.status = 500;
        next(err);
        return {
            "status": "500",
            "content": err.message
        }
    }
};

exports.changeConcert = async (id, body, next) => {
    try{
        let concerts = await fs.readFile(dbPath, 'utf-8');
        concerts = JSON.parse(concerts);
        const keys = Object.keys(concerts["Концерты"]);
        const concertId = toNormalConcertId(id)
        if(typeof concertId === "object"){
            return {
                "status": concertId.status,
                "content": null
            };
        }
        if(!(keys.includes(concertId))){
            return {
                "status": 404,
                "content": "Error 404 - Object not found"
            }
        }
        concerts["Концерты"][concertId]['name'] = body['name'];
        concerts["Концерты"][concertId]['rate'] = body['rate'];
        concerts["Концерты"][concertId]['isFree'] = body['isFree'];
        concerts["Концерты"][concertId]['actors'] = body['actors'];
        let result = await fs.writeFile(dbPath, JSON.stringify(concerts, null, 4));
        return {
            "status": 200,
            "content": null
        }
    }catch(err){
        err.status = 500;
        next(err);
        return {
            "status": 500,
            "content": err.message
        }
    }
};

exports.updateConcert = async (id, next) => {
    try{
        const dbContent = await fs.readFile(dbPath, 'utf-8');
        const concerts = JSON.parse(dbContent);
        const concertId = toNormalConcertId(id);
        if(typeof concertId === "object"){
            return {
                "status": concertId.status,
                "content": null
            };
        }else{
            if(Object.keys(concerts['Концерты']).includes(concertId)){
                concerts['Концерты'][concertId]['rate'] += 1;
                let resp = await fs.writeFile(dbPath, JSON.stringify(concerts, null, 4));
                return {
                    "status": 200,
                    "content": `rate of concert with id=${concertId} successfully upped`
                };
            }else{
                 return {
                    "status": 404,
                    "content": null
                };
            }
        }
    }catch(err){
        err.status = 500;
        next(err);
        return {
            "status": 500,
            "content": err.message
        }
    }
};

exports.deleteConcert = async (id, next) => {
    try{
        const content = await fs.readFile(dbPath, 'utf-8');
        const dbContent = JSON.parse(content);
        const concertId = toNormalConcertId(id);

        if(typeof concertId === "object") {
            return {
                "status": concertId.status,
                "content": null
            };
        }

        const keys = Object.keys(dbContent['Концерты'])
        if(!keys.includes(concertId)){
            return {
                "status": 404,
                "content": `Concert with ${concertId} not found`
            };
        }

        let newDB = {};
        for(let i = 0; i < keys.length; i++){
            if(keys[i] !== concertId){
                newDB[keys[i]] = dbContent['Концерты'][keys[i]];
            }
        }
        dbContent['Концерты'] = newDB;

        let result = await fs.writeFile(dbPath, JSON.stringify(dbContent, null, 4));

        return{
            "status": 200,
            "content": `Object with id=${concertId} successfully deleted`
        };
    }catch(err){
        err.status = 500;
        next(err);
        return{
            "status": 500,
            "content": err.message
        };
    }
};


exports.getAllCinemas = async (next) => {
    try{
        const dbContent = await fs.readFile(dbPath, 'utf-8');
        return {
            "status": 200,
            "content": JSON.parse(dbContent)['Театры']
        };
    }catch(err){
        err.status = 500;
        next(err);
        return {
            "status": 500,
            "content": null
        }
    }
};

exports.getCinema = async (id, next) => {
    try{
        const dbContent = await fs.readFile(dbPath, 'utf-8');
        const cinemas = JSON.parse(dbContent)['Театры'];
        const cinemaId = toNormalConcertId(id);
        if(typeof cinemaId === "object"){
            return {
                "status": cinemaId.status,
                "content": null
            };
        }else{
            if(Object.keys(cinemas).includes(cinemaId)){
                return {
                    "status": 200,
                    "content": cinemas[cinemaId]
                };
            }else{
                 return {
                    "status": 404,
                    "content": null
                };
            }
        }
    }catch(err){
        if(!(err.status)){
            err.status = 500;
        }
        next(err);
        return {
            "status": 500,
            "content": null
        }
    }
};

exports.addCinema = async (req, res, next) => {
    res.status(501).json({"message": "Error 501 - Method is not create!"});
};

exports.changeCinema = async (req, res, next) => {
    res.status(501).json({"message": "Error 501 - Method is not create!"});
};

exports.updateCinema = async (req, res, next) => {
    res.status(501).json({"message": "Error 501 - Method is not create!"});
};

exports.deleteCinema = async (req, res, next) => {
    res.status(501).json({"message": "Error 501 - Method is not create!"});
};