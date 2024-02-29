import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

const verifyAdmin = async (request: Request, response: Response, next: NextFunction) => {
    try {
        /** membaca data header request */
        const header = request.headers.authorization;

        /** membaca data token  */
        const token = header?.split(" ")[1] || "";
        const secretkey = "rental mobil";

        /** proses verifikasi token */
        verify(token, secretkey, error => {
            if (error) {
                return response.status(401).json({
                    status: false,
                    message: 'Unauthorized Access'
                })
            }
            next()
        })
        
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error,
        });
    }
};

export { verifyAdmin }