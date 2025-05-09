const express = require("express");
const router = express.Router();

const {
    getAllConcerts,
    getConcert,
    addConcert,
    changeConcert,
    updateConcert,
    deleteConcert
} = require("../controllers/concertController.js");

const {
    methodIsNotBelieve
} = require("../controllers/unionController.js")

router.get("/", getAllConcerts);
router.post("/", addConcert);
router.all("/", methodIsNotBelieve);

router.get("/:id", getConcert);
router.put("/:id", changeConcert);
router.patch("/:id", updateConcert);
router.delete("/:id", deleteConcert);
router.all("/", methodIsNotBelieve);

module.exports = router;