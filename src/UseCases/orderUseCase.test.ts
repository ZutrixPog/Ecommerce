import assert from "assert";

import FakeOrderItemRepo from "../Datasource/fake/fakeOrderItemRepo";
import FakeOrderRepo from "../Datasource/fake/fakeOrderRepo";
import FakeProductRepo from "../Datasource/fake/fakeProductRepo";
import Order from "../Entities/order";
import OrderItem from "../Entities/orderItem";
import Product from "../Entities/product";
import User from "../Entities/user";
import OrderUseCase from "./orderUseCase";

const orders = new FakeOrderRepo();
const orderItems = new FakeOrderItemRepo();
const products = new FakeProductRepo();
const usecase = new OrderUseCase(orders, orderItems, products);

describe("order Usecase", () => {
    let orderId: any;

    it("should let users make a order", async () => {
        orderId = await usecase.create(new Order({user: new User({id: 1, username: "emad"})}), [
            new OrderItem({order: new Order({id: 1}), product: new Product({id: 1}), amount: 2}),
            new OrderItem({order: new Order({id: 1}), product: new Product({id: 2}), amount: 1})
        ]);

        assert.notEqual(null, orderId);
    });

    it("should let users retrieve orders by user id", async () => {
        const orders = await usecase.findUserOrders(new User({id: 1}));

        assert.notEqual(orders, null);
        assert.equal(orders[0].getUser()?.getId(), 1);
    });

    it("should let users retrieve order items by order id", async () => {
        const items = await usecase.getOrderItems(orderId);

        assert.notEqual(items, null);
    });
    
    it("should let users cancel orders", async () => {
        const id = await usecase.cancel(orderId, 1);

        assert.equal(id, orderId);
    });
});