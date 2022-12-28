import pkg from "jsonwebtoken";

const { verify, sign } = pkg;

export function checkAuth(token) {

    try {
        const user = verify(token, process.env.JWT_SK)
        return user;
    }catch(e){
        return null;
    }
}

export function authUser(user) {    
    return sign(user, process.env.JWT_SK);
}