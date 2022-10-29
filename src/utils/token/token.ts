import * as jwt from 'jsonwebtoken';

const secret = "No one can see this";

function genToken(payload: any): string {
    return jwt.sign(payload, secret, { expiresIn: "1d"});
}

function verifyToken(token: string): any {
    return jwt.verify(token, secret);
}

export {genToken, verifyToken};