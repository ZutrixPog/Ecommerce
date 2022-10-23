import assert from 'assert';
import Order from '../../Entities/order';
import OrderItem from '../../Entities/orderItem';
import Product from '../../Entities/product';
import Repo from '../datasource.types';
import OrderItemRepo from '../orderItemRepo';

describe("Order Item Repository", () => {
    let repo: Repo<OrderItem>;
    let tempid: any;

    before(() => {
        repo = new OrderItemRepo();
    });

    beforeEach(async () => {
        tempid = await repo.addOne(new OrderItem({order: new Order({id: 1}), product: new Product({id: 4}), amount: 10}));
    });

    afterEach(() => {
        repo.deleteOne(tempid);
    })

    it("should find all items", async () => {
        const items = await repo.findAll();
    });

    it("should find one item by id", async () => {
        const item = await repo.findOne(tempid);

        console.log(item);
        assert(item.getOrder() != null)
    });

    it("should find all items by order", async () => {
        const item = await (repo as OrderItemRepo).findAllByOrder(1);

        console.log(item);
        assert(item != null);
    });

    it("should add one item", async () => {
        const id = await repo.addOne(new OrderItem({order: new Order({id: 2}), product: new Product({id: 4}), amount: 12}));

        assert(await repo.findOne(id) != null);

        await repo.deleteOne(id);
    });

    it("should update an item", async () => {
        const id = await repo.updateOne(new OrderItem({id: tempid, amount: 2}));

        assert((await repo.findOne(id)).getAmount() == 2);
    });

    it("should delete an item", () => {
        repo.deleteOne(tempid);
    });
});