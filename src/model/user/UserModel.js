import UserSchema from "./UserSchema.js";

export default function insertUser  (userObj)  {
    return new Promise((resolve, reject) => {
        UserSchema(userObj)
            .save()
            .then((data) => resolve(data))
            .catch((error) => reject(error))
    })
}

export function getUserByEmail  (email)  {
    return new Promise((resolve, reject) => {
        if (!email) return false;

        try {
            UserSchema.findOne({ email })
            .then((data) => {
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            });
        } catch (error) {
            reject(error)
        }
    })
}

//export default {insertUser, getUserByEmail};