import { encryptObject, decryptObject } from "./cypher.js"

let encryptedUser = undefined;

export function checkAuth(req, res, next) {
    const userAuth = req.cookies.User_Auth;
    console.log(Buffer.from(userAuth.key));
    console.log(userAuth)
    if (!userAuth) {
        encryptedUser = undefined;
        return res.status(400).send("You dont have permission to access this")
    }

    try {
        console.log(decryptObject(userAuth.encrypted, Buffer.from(userAuth.key), Buffer.from(userAuth.iv)))
        
    } catch (err) {
        return res.status(400).send("You dont have permission to access this")
    }

    return next();
}

export function authUser(user) {
    user = convertToObject(user.metaData, user.rows[0]);
    encryptedUser = encryptObject(user);

    return encryptedUser;
}

function convertToObject(titles, datas) {
    titles = titles.map(item => item.name);

    const obj = {};
    for (let i = 0; i < titles.length; i++) {
        obj[titles[i]] = datas[i];
    }

    return obj;
}
