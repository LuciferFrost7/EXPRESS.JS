const express = require("express");
const app = express();


const bodyParser = require("body-parser");
app.use(bodyParser.json());

const logger = require("./src/middlewares/logger.js");
app.use(logger);

const concertRouter = require("./src/routes/concertRouter.js");
app.use("/concerts", concertRouter);
const cinemaRouter = require("./src/routes/cinemaRouter.js");
app.use("/cinemas", cinemaRouter);
app.use((req, res) => {
    res.status(404);
    res.json({
        "message": "Error 404 - This link is not Found!!!"
    });
})

const errorHandler = require("./src/middlewares/errorHandler.js");
app.use(errorHandler);


const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
    console.log(`SERVER ONLINE ON PORT ${PORT}!`);
});