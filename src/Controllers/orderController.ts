import User from "../Entities/user";
import OrderUseCase from "../UseCases/orderUseCase";
import { IRequest, IResponse } from "./controller.types";

class OrderController {
    private headers = {
        'Content-Type': 'application/json'
    };

    private orderUsecase: OrderUseCase;

    constructor(orderUsecase: OrderUseCase) {
        this.orderUsecase = orderUsecase;
    }

    public async getOrders(req: IRequest): Promise<IResponse> {
        try {
            const {order: {userId}} = req.body;

            const orders = await this.orderUsecase.findUserOrders(new User({id: userId}));

            let res = [];
            for (const order of orders) {
                const orderItems = await this.orderUsecase.getOrderItems(order.getId());
                res.push({
                    order,
                    orderItems
                });
            }

            return {
                headers: this.headers,
                status: 200,
                body: res
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

    public async postMakeOrder(req: IRequest): Promise<IResponse> {
        try {
            const {order, items} = req.body;

            const id = await this.orderUsecase.create(order, items);

            return {
                headers: this.headers,
                status: 200,
                body: {
                    id
                }
            };
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
    
    public async deleteCancelOrder(req: IRequest): Promise<IResponse> {
        try {
            const {order: {id}} = req.body;

            const canceled = await this.orderUsecase.cancel(id);

            return {
                headers: this.headers,
                status: 200,
                body: {
                    id: canceled
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

export default OrderController;