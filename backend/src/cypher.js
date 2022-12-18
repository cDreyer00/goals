import { createHash, createCipheriv, randomBytes, createDecipheriv, scrypt } from "crypto"



export function hash(input) {
    const output = createHash('sha256').update(input).digest('base64')
    return output;
}

export function encryptObject(input) {
    const key = randomBytes(32);
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes256', key, iv);

    const tojs = JSON.stringify(input);
    const encrypted = cipher.update(tojs, 'utf-8', 'hex') + cipher.final('hex');

    return { encrypted: encrypted, key: key.toString('base64'), iv: iv.toString('base64') };
}

export function decryptObject(encrypted, key, iv) {

    const decipher = createDecipheriv('aes256', Buffer.from(key, 'base64'), Buffer.from(iv, 'base64'));
    const decrypted = decipher.update(encrypted, 'hex', 'utf-8') + decipher.final('utf-8');

    return JSON.parse(decrypted);
}