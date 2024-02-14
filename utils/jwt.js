import jwt from 'jsonwebtoken';
import "dotenv/config.js";

const secret = `${process.env.JWT_SECRET}`;

export const generateToken = (user) => {
    return jwt.sign(
        {
            isApproved:user.isApproved,
            id: user.id,
            role: user.role
        },
        secret, { expiresIn: '24h' }); 
};

export const verifyToken = (token) => {
    return jwt.verify(token, secret);
};