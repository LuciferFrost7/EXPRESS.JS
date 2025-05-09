const fs = require("fs").promises;
const path = require("path");

const{
    toNormalConcertId
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
    console.log(toNormalConcertId(keys[keys.length - 1]), keys.length === 0, keys.length)
        concerts["Концерты"][keys.length !== 0 ? toNormalConcertId(keys.length) : "0"] = {
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

exports.changeConcert = async (req, res, next) => {
    res.status(501).json({"message": "Error 501 - Method is not create!"});
};

exports.updateConcert = async (req, res, next) => {
    res.status(501).json({"message": "Error 501 - Method is not create!"});
};

exports.deleteConcert = async (req, res, next) => {
    res.status(501).json({"message": "Error 501 - Method is not create!"});
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