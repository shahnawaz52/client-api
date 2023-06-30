import express from "express";
import helmet from "helmet"
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./src/routers/user.js";
import ticketRouter from "./src/routers/ticket.js";
import errorhandler from "./src/utils/errorhandler.js";
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

const app = express();
const port = process.env.PORT || 3001

// API Security
// app.use(helmet());

// handle CORS error;
app.use(cors());

// Database connection

mongoose.connect(process.env.MONGO_URL);

if(process.env.NODE_ENV !== 'production') {
    const mDB = mongoose.connection;
    mDB.on("open", () => {
        console.log("MongoDB is connected");
    })
    mDB.on("error", (error) => {
        console.log(error);
    })
    // Logger
    app.use(morgan("tiny"));
}


// Set body parser
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json());


app.use("/v1/user", userRouter);

app.use("/v1/ticket", ticketRouter);

app.use((req, res, next) => {
    const error = new Error("Resources not found!!");
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    errorhandler(error, res);
})


app.listen(port, () => {
    console.log(`API is ready on http://localhost:${port}`);
})