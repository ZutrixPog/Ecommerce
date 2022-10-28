import Admin from "../Entities/admin";
import Product from "../Entities/product";
import User from "../Entities/user";
import AdminUseCase from "../UseCases/adminUseCase";
import { IRequest, IResponse } from "./controller.types";


class AdminController {
    private headers = {
        'Content-Type': 'application/json'
    };

    private adminUsecase: AdminUseCase;

    constructor(adminUsecase: AdminUseCase) {
        this.adminUsecase = adminUsecase;
    }

    public async postLogin(req: IRequest): Promise<IResponse> {
        try {
            const {username, password} = req.body;

            const token = await this.adminUsecase.authenticate(username, password);

            if (token) {
                return {
                    headers: this.headers, 
                    status: 200,
                    body: {
                        token
                    }
                }
            } else {
                return {
                    headers: this.headers,
                    status: 400,
                    body: {
                        error: "Not Found"
                    } 
                }
            }
        } catch (err: any) {
            console.error(err);
            return {
                headers: this.headers,
                status: 400,
                body: {
                    error: err.message
                }
            }
        }
    }

    public async postSignUp(req: IRequest): Promise<IResponse> {
        try {
            const {admin} = req.body;

            const token = await this.adminUsecase.signUp(new Admin(admin));

            return {
                headers: this.headers, 
                status: 200,
                body: {
                    token
                }
            }
            
        } catch (err: any) {
            console.error(err);
            return {
                headers: this.headers,
                status: 400,
                body: {
                    error: err.message
                }
            }
        }
    }

    public async postAddProduct(req: IRequest): Promise<IResponse> {
        try {
            const {product} = req.body;

            const id = await this.adminUsecase.newProduct(new Product(product));

            return {
                headers: this.headers, 
                status: 200,
                body: {
                    id
                }
            }            
        } catch (err: any) {
            console.error(err);
            return {
                headers: this.headers,
                status: 400,
                body: {
                    error: err.message
                }
            }
        }
    }

    public async putEditProduct(req: IRequest): Promise<IResponse> {
        try {
            const {product} = req.body;

            const id = await this.adminUsecase.modifyProduct(new Product(product));

            return {
                headers: this.headers, 
                status: 200,
                body: {
                    id
                }
            }
        } catch (err: any) {
            console.error(err);
            return {
                headers: this.headers,
                status: 400,
                body: {
                    error: err.message
                }
            }
        }
    }

    public async putEditUser(req: IRequest): Promise<IResponse> {
        try {
            const {user} = req.body;

            const id = await this.adminUsecase.modifyUser(new User(user));

            return {
                headers: this.headers, 
                status: 200,
                body: {
                    id
                }
            }
        } catch (err: any) {
            console.error(err);
            return {
                headers: this.headers,
                status: 400,
                body: {
                    error: err.message
                }
            }
        }
    }

    public async deleteUser(req: IRequest): Promise<IResponse> {
        try {
            const {user} = req.body;

            const deleted = await this.adminUsecase.deleteUser(new User(user));

            return {
                headers: this.headers, 
                status: 200,
                body: {
                    id: deleted
                }
            }
        } catch (err: any) {
            console.error(err);
            return {
                headers: this.headers,
                status: 400,
                body: {
                    error: err.message
                }
            }
        }
    }

    public async deleteProduct(req: IRequest): Promise<IResponse> {
        try {
            const {product} = req.body;

            const deleted = await this.adminUsecase.deleteProduct(new Product(product));

            return {
                headers: this.headers, 
                status: 200,
                body: {
                    id: deleted
                }
            }
        } catch (err: any) {
            console.error(err);
            return {
                headers: this.headers,
                status: 400,
                body: {
                    error: err.message
                }
            }
        }
    }
}

export default AdminController;