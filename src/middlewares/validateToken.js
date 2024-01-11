import {TOKEN_SECRET} from '../config.js'
import jwt from 'jsonwebtoken'

export const authRequest = (req, res ,next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message: 'Unauthorized'})
    }
    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
        if(err){
            return res.status(401).json({message: 'Unauthorized'})
        }
        req.user = decoded;
        next();
    })
}