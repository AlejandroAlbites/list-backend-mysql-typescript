import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export interface RequestWithUserId extends Request {
    userId?: string
}

export const validateJWT = (req: RequestWithUserId, res: Response, next: NextFunction) => {
    try {
        const token: string | undefined = req.header('x-token')

        if (!token) {
            return res.status(401).json({
                ok: false,
                message: 'Your sesion expired'
            })
        }

        const { id }: any = jwt.verify(token, process.env.JWT_KEY as any);
        req.userId = id;

        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }

};
