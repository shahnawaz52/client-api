import express from "express";
const router = express.Router();
import insertUser from '../model/user/UserModel.js';
import hashPassword from "../helpers/bcrypt.js";

router.all("/", (req, res, next) => {
    // res.json({message: "return from user router"});
    next();
})

router.post("/", async (req, res) => {
    const { name, company, address, phone, email, password } = req.body;
    try {
        const hashpassword = await hashPassword(password);
        const newUserObj =  { 
            name, 
            company, 
            address, 
            phone, 
            email, 
            password: hashpassword 
        }
        const result = await insertUser(newUserObj);
        console.log(result);
        res.json({message: "New user created!!", result});
    } catch(error) {
        console.log(error);
        res.json({status: 'error', message: error.message});
    }
})

// module.exports = router;
export default router;