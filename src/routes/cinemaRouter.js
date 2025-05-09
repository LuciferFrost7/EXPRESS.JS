const express = require("express");
const router = express.Router();

const {
    getAllCinemas,
    getCinema,
    addCinema,
    changeCinema,
    updateCinema,
    deleteCinema
} = require("../controllers/cinemaController.js");

const {
    methodIsNotBelieve
} = require("../controllers/unionController.js")

router.get("/", getAllCinemas);
router.post("/", addCinema);
router.all("/", methodIsNotBelieve);

router.get("/:id", getCinema);
router.put("/:id", changeCinema);
router.patch("/:id", updateCinema);
router.delete("/:id", deleteCinema);
router.all("/", methodIsNotBelieve);

module.exports = router;