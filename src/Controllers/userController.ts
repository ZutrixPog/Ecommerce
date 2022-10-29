import User from "../Entities/user";
import OrderUseCase from "../UseCases/orderUseCase";
import UserUseCase from "../UseCases/userUseCase";
import { IRequest, IResponse } from "./controller.types";


class UserController {
    private headers = {
        'Content-Type': 'application/json'
    };

    private userUsecase: UserUseCase;

    constructor(userUsecase: UserUseCase) {
        this.userUsecase = userUsecase;
    }

    public async postLogin(req: IRequest): Promise<IResponse> {
        try {
            const {username, password} = req.body;

            const token = await this.userUsecase.authenticate(username, password);

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
            const {user} = req.body;

            const token = await this.userUsecase.signUp(new User(user));

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

    public async getUser(req: IRequest): Promise<IResponse> {
        try {
            const {id} = req.params;

            if (id != req.data.user.id) {
                throw new Error("you can only retrieve data about yourself");
            }

            const user = await this.userUsecase.findById(id);

            return {
                headers: this.headers,
                status: 200,
                body: {
                    user: user.asRes()
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
            const {id} = req.params;

            if (id != req.data.user.id) {
                throw new Error("you can only retrieve data about yourself");
            }

            const deleted = await this.userUsecase.deleteUser(id);

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

export default UserController;