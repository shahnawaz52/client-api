import express from "express";
const router = express.Router();
import insertUser  from '../model/user/UserModel.js';
import {getUserByEmail}  from '../model/user/UserModel.js';
import hashPassword from "../helpers/bcrypt.js";
import { comparePassword } from "../helpers/bcrypt.js";

router.all("/", (req, res, next) => {
    // res.json({message: "return from user router"});
    next();
})

router.post("/", async (req, res) => {
    const { name, company, address, phone, email, password } = req.body;
    try {
        const hashpassword = await hashPassword(password);
        const newUserObj = {
            name,
            company,
            address,
            phone,
            email,
            password: hashpassword
        }
        const result = await insertUser(newUserObj);
        console.log(result);
        res.json({ message: "New user created!!", result });
    } catch (error) {
        console.log(error);
        res.json({ status: 'error', message: error.message });
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ status: "error", message: "Invalid Email or Password!" })
    }

    // get user details from db
    const user = await getUserByEmail(email);
    console.log(user);
    const passwordDB = user && user._id ? user.password : null;

    if(!passwordDB) {
        return res.json({status: "error", message: "Invalid Email or Password!"});
    }

    const result = await comparePassword(password, passwordDB);
    console.log(result);

    res.json({ status: "success", message: "Login Successfully!" })
})

// module.exports = router;
export default router;
