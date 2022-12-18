import { encryptObject, decryptObject } from "./cypher.js"

export let userIn = {}

export function checkAuth(req, res, next) {
    const userAuth = req.cookies.User_Auth;    

    if (!userAuth) {
        userIn = {};
        return res.status(400).send("You dont have permission to access this")
    }

    try {
        userIn = decryptObject(userAuth.encrypted, userAuth.key, userAuth.iv);

        return next();
    } catch (err) {
        return res.status(400).send("You dont have permission to access this")
    }
}

export function authUser(user) {
    user;
    return encryptObject(user);
}

export function convertToObject(data) {
    // Get the field names from the metadata
    const fields = data.metaData.map(field => field.name);

    // Create an array of objects with the field names as keys
    const objects = data.rows.map(row => {
        const obj = {};
        row.forEach((value, index) => {
            obj[fields[index]] = value;
        });
        return obj;
    });
    return objects;
}
