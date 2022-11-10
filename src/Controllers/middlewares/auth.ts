import { verifyToken } from "../../utils/token/token";
import { IRequest, IResponse } from "../controller.types";

const headers = {
    'Content-Type': "application/json"
}

function auth(access: "user" | "admin") {

    return async (req: IRequest) => {
        try {
            const token = req.headers.authorization;
    
            if (!token) {
                throw new Error("Please provide a valid token");
            }
    
            const decoded = verifyToken(token);
    
            if (decoded.access === access) {
                return {
                    headers,
                    status: 200,
                    body: {},
                    data: {
                        user: decoded,
                    }
                }
            } else {
                return {
                    headers,
                    status: 403,
                    body: {
                        error: "Access Denied"
                    }
                }
            }
        } catch (err: any) {
            console.error(err);
            return {
                headers,
                status: 403,
                body: {
                    error: err.message
                }
            }
        }    
    }
}



export default auth;