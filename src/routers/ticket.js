import express from "express";
const router = express.Router();

router.all("/", (req, res, next) => {

    res.json({message: "return from ticket router"});
})


export default router;
