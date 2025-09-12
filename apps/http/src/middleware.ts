import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import  JWT_SECRET  from "@repo/backend-common/config"

declare global {
    namespace Express {
        interface Request {
            userId?: any
        }
    }
}


export function middleware(req:Request, res: Response, next: NextFunction) {
    const token = req.headers["authorization"] || ""

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload

    if (decoded) {
        
        req.userId = decoded.userId 
        next();
    } else {
        res.status(403).json({
            message: "Unauthorized"
        })
    }
}