import { encryptObject, decryptObject } from "./cypher.js"

let encryptedUser = undefined;

export function checkAuth(req, res, next) {
    const token = req.cookies.token;
    console.log(token);

    return next();
}

export function authUser(user) {
    console.log(user);
    encryptedUser = encryptObject(user);
    return encryptedUser;
}