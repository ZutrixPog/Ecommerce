import Order from "../Entities/order";
import OrderItem from "../Entities/orderItem";
import Product from "../Entities/product";
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
            const {user: {id}} = req.data;

            const orders = await this.orderUsecase.findUserOrders(new User({id}));

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
            let {order, items} = req.body;
            order.user = new User({id: order.user});

            const id = await this.orderUsecase.create(
                new Order(order), items.map((item: any) => new OrderItem({order: new Order({id: order.user}), product: new Product({id: item.product.id}), amount: item.amount}))
                );

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

            const canceled = await this.orderUsecase.cancel(id, req.data.user.id);

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