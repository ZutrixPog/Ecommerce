import Order from "../../Entities/order";
import Repo from "../datasource.types";
import OrderItem from '../../Entities/orderItem';
import Product from "../../Entities/product";
import User from "../../Entities/user";
import getRandomId from "./fakeId";

class FakeOrderRepo implements Repo<Order> {

    private orders: Order[];

    constructor() {
        this.orders = [
            new Order({id: 1, user: new User({id: 1, username: "emad"}), total: 10000}),
            new Order({id: 2, user: new User({id: 1, username: "emad"}), total: 10000}),
            new Order({id: 3, user: new User({id: 2, username: "erfan"}), total: 10000}),
        ]
    }

    async findAll(): Promise<Order[]> {
        return this.orders;
    }

    async findOne(id: any): Promise<Order> {
        return this.orders.filter(order => {
            return order.getId() == id;
        })[0];
    }

    async addOne(order: Order): Promise<any> {
        order.setId(getRandomId());
        this.orders.push(order);
        return order.getId();
    }

    async addOrderItems(order: string | Order, item: OrderItem): Promise<any> {
        return item.getId();
    }

    async updateOne(newOne: Order): Promise<any> {
        this.orders = this.orders.map(order => {
            if (newOne.getId() == order.getId()) {
                return newOne;
            }
            return order;
        });
        return newOne.getId();
    }

    async deleteOne(id: any): Promise<void> {
        this.orders = this.orders.filter(order => {
            return order.getId() != id;
        });
        return id;
    }

    done() {}
}

export default FakeOrderRepo;