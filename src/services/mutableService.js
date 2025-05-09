const error = new Error("Error 400 - Incorrect data type!");
error.status = 400;

exports.toNormalConcertId = (id) => {
  if(typeof id === "number"){
      if(id < 0){
          throw error;
      }else{
          return String(id);
      }
  }else if(typeof id === "string"){
      if(isNaN(parseInt(id)) || parseInt(id) < 0){
          throw error;
      }else{
          return id;
      }
  }else{
      throw error;
  }
};

const CONCERT_MAX_BODY_LENGTH = 4;
const CONCERT_PARAMS = ['name', 'rate', 'isFree', 'actors'];

exports.isConcertBody = (body) => {
    if(!(body)){
        return {
            "status": 400,
            "content": "Error 400 - Body is not believe"
        }
    }
    if(!(typeof(body) === "object")){
        return {
            "status": 400,
            "content": "Error 400 - Body is not a correct object"
        }
    }
    const keys = Object.keys(body);
    if(!(keys.length === CONCERT_MAX_BODY_LENGTH)){
        return {
            "status": 400,
            "content": `Error 400 - Body need ${CONCERT_MAX_BODY_LENGTH} params, but given ${keys.length}`
        }
    }
    for(let i = 0; i < CONCERT_MAX_BODY_LENGTH; i++){
        if(!(CONCERT_PARAMS.includes(keys[i]))){
            return {
                "status": 400,
                "content": `Error 400 - Body haven't params like ${keys[i]}`
            }
        }
    }
    if(typeof(body['name']) !== "string"){
        return {
            "status": 400,
            "content": `Error 400 - Body name need to have type String, not ${typeof body['name']}`
        }
    }
    if(typeof(body['rate']) !== "number"){
        return {
            "status": 400,
            "content": `Error 400 - Body rate need to have type Number, not ${typeof body['rate']}`
        }
    }
    if(typeof(body['isFree']) !== "boolean"){
        return {
            "status": 400,
            "content": `Error 400 - Body isFree need to have type Boolean, not ${typeof body['isFree']}`
        }
    }
    if(typeof(body['actors']) !== "object"){
        return {
            "status": 400,
            "content": `Error 400 - Body actors need to have type Object, not ${typeof body['actors']}`
        }
    }
    return {
        "status": 200,
        "content": null
    }
}