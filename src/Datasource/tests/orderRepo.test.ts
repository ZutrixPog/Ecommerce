import assert from 'assert';
import Order from '../../Entities/order';

import User from '../../Entities/user';
import Repo from "../datasource.types";
import OrderRepo from '../orderRepo';

describe("orderRepo", () => {
    let repo: Repo<Order>;
    let tempid: any;

    before(() => {
        repo = new OrderRepo();
    });

    beforeEach(async () => {
        tempid = await repo.addOne(new Order({user: new User({id: 1}), total: 10000, paymentId: 12345}));
    });

    afterEach(() => {
        repo.deleteOne(tempid);
    });

    it("should find all items", async () => {
        const items = await repo.findAll();
    });

    it("should find one item", async () => {
        const item = await repo.findOne(tempid);

        console.log(item);
        assert(item.getTotal() != null)
    });

    it("should add one item", async () => {
        assert(await repo.findOne(tempid) != null);
    });

    it("should update an item", async () => {
        const id = await repo.updateOne(new Order({id: tempid, paymentId: 345}));

        assert((await repo.findOne(id)).getPaymentId() == "345");
    });

    it("should delete an item", () => {
        repo.deleteOne(tempid);
    });
});