import bcrypt from "bcrypt";
const saltRounds = 10;

const hashPassword = (plainPassword) => {
    return new Promise((resolve) => {
        resolve(bcrypt.hashSync(plainPassword, saltRounds))
    })
}

export default hashPassword;
