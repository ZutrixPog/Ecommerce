import { IRequest } from "../../Controllers/controller.types";

function callBack(controller: any, label: "route" | "middleware"): any {

    return (req: any, res: any, next: any) => {

        const httpRequest:IRequest = {
            body: req.body,
            query: req.query,
            params: req.params,
            ip: req.ip,
            method: req.method,
            io: req.app.io,
            path: req.path,
            headers: req.headers,
            data: null
        };

        if (label === "route") {
            
            controller(httpRequest)
            .then((httpResponse:any) => {
    
                if (httpResponse.headers) {
                    res.set(httpResponse.headers);
                }

                if (httpResponse.cookies) {
                    httpResponse.cookies.forEach((cookie:any) => {
                        const {key, value, options} = cookie;
                        res.cookie(key, value, options);
                    });
                }

                if (httpResponse.clearCookie) {
                    res.clearCookie(httpResponse.clearCookie);
                }

                res.type('json');
                res.status(httpResponse.status).send(httpResponse.body);
    
            })
            .catch((err: any) => {
                
                console.error(err);
                res.status(500).send({ error: 'An unknown error occurred.' })
            });

        }else {
            controller(httpRequest)
            .then((httpResponse: any)=> {
                
                if (httpResponse.headers) {
                    res.set(httpResponse.headers);
                }

                if (httpResponse.statusCode === 200) {
                    req.data = httpResponse.data;
                    next();
                    return;
                }
                res.type('json');
                res.status(httpResponse.status).send(httpResponse.body);
            }).catch((err: any) => {
                console.error(err);
                res.status(500).send({ error: 'An unknown error occurred.' })
            });
        }
    }
} 

export default callBack;