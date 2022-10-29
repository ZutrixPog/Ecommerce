
interface IRequest {
    body?: any,
    query?: any,
    params?: any,
    ip?: any,
    io?: any,
    method?: any,
    path?: any,
    headers?: any,
    data?: any,
}

interface IResponse {
    headers: any,
    status: any,
    body: any,
    data?: any
}

export {IRequest, IResponse};