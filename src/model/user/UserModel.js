import UserSchema from "./UserSchema.js";

const insertUser = userObj => {
    return new Promise((resolve, reject) => {
        UserSchema(userObj)
        .save()
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    })

}

export default insertUser;