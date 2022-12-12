import { createHash, createCipheriv, randomBytes, createDecipheriv } from "crypto"

export function hash(input) {
    const output = createHash('sha256').update(input).digest('base64')
    return output;
}

export function encryptObject(input) {
    const key = randomBytes(32);
    console.log(key);
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes256', key, iv);

    const tojs = JSON.stringify(input);
    const encpryted = cipher.update(tojs, 'utf-8', 'hex') + cipher.final('hex');

    return { encpryted: encpryted, key: key, iv: iv };
}

export function decryptObject(encrypted, key, iv) {

    const decipher = createDecipheriv('aes256', key, iv);
    const decrypted = decipher.update(encrypted, 'hex', 'utf-8') + decipher.final('utf-8');
    
    return JSON.parse(decrypted);
}