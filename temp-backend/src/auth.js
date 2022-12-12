import { encryptObject, decryptObject } from "./cypher.js"


export function checkAuth(req, res, next) {
    const userAuth = req.cookies.User_Auth;

    if (!userAuth) {
        return res.status(400).send("You dont have permission to access this")
    }

    try {
        console.log(decryptObject(userAuth.encrypted, userAuth.key, userAuth.iv))

    } catch (err) {
        return res.status(400).send("You dont have permission to access this")
    }

    return next();
}

export function authUser(user) {
    user = convertToObject(user.metaData, user.rows[0]);

    return encryptObject(user);
}

function convertToObject(titles, datas) {
    titles = titles.map(item => item.name);

    const obj = {};
    for (let i = 0; i < titles.length; i++) {
        obj[titles[i]] = datas[i];
    }

    return obj;
}
