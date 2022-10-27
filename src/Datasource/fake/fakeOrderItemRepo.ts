import Order from "../../Entities/order";
import Repo from "../datasource.types";
import OrderItem from '../../Entities/orderItem';
import Product from "../../Entities/product";
import User from "../../Entities/user";
import Admin from "../../Entities/admin";
import getRandomId from "./fakeId";

class FakeOrderItemRepo implements Repo<OrderItem> {

    private orderItems: OrderItem[];

    constructor() {
        this.orderItems = [
            new OrderItem({id: 1, order: new Order({id: 1, user: new User({id: 1, username: "emad"}), total: 10000}), product: new Product({id: 1, name: 'test', description: 'test', category: 1, addedBy: new Admin({id:1}), price: 5000}), amount: 10}),
            new OrderItem({id: 2, order: new Order({id: 1, user: new User({id: 1, username: "emad"}), total: 200000}), product: new Product({id: 2, name: 'test2', description: 'test2', category: 1, addedBy: new Admin({id:1}), price: 5000}), amount: 5}),
            new OrderItem({id: 3, order: new Order({id: 2, user: new User({id: 2, username: "erfan"}), total: 5000}), product: new Product({id: 3, name: 'test3', description: 'test3', category: 1, addedBy: new Admin({id:1}), price: 1000}), amount: 7}),
        ]
    }

    async findAll(): Promise<OrderItem[]> {
        return this.orderItems;
    }

    async findAllByOrder(orderId: any): Promise<OrderItem[]> {
        return this.orderItems.filter(item => {
            return item.getOrder()?.getId == orderId;
        });
    }

    async findOne(id: any): Promise<OrderItem> {
        return this.orderItems.filter(item => {
            return item.getId == id;
        })[0];
    }

    async addOne(item: OrderItem): Promise<any> {
        item.setId(getRandomId);
        this.orderItems.push(item);
        return item.getId();
    }

    async updateOne(newOne: OrderItem): Promise<any> {
        this.orderItems = this.orderItems.map(item => {
            if (item.getId() == newOne.getId()) {
                return newOne;
            }
            return item;
        });
        return newOne.getId();
    }

    async deleteOne(id: any): Promise<any> {
        this.orderItems = this.orderItems.filter(item => {
            return item.getId() != id;
        });
        return id;
    }

    done() {}
}

export default FakeOrderItemRepo;