import bcrypt from "bcrypt";
const saltRounds = 10;

export default function hashPassword (plainPassword) {
    return new Promise((resolve) => {
        resolve(bcrypt.hashSync(plainPassword, saltRounds))
    })
}

export function comparePassword (plainPassword, passwordDB) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainPassword, passwordDB, function (error, result) {
            if(error) reject(error)

            resolve(result);
        })
    })
}

