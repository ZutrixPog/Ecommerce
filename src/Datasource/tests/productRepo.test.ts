import assert from 'assert';
import Admin from '../../Entities/admin';
import Product from '../../Entities/product';
import Repo from '../datasource.types';
import ProductRepo from '../productRepo';

describe("Product Repository", () => {
    let repo: Repo<Product>;
    let tempid: any;

    before(() => {
        repo = new ProductRepo();
    });

    beforeEach(async () => {
        tempid = await repo.addOne(new Product({name: 'test', description: "test", category: 1, addedBy: new Admin({id: 1}), price: 100000}));
    });

    afterEach(() => {
        repo.deleteOne(tempid);
    });

    it("should find all items", async () => {
        const items = await repo.findAll();
    });

    it("should find one item", async () => {
        const item = await repo.findOne(new Product({id: tempid}));

        console.log(item);
        assert(item.getName() == "test");
    });

    it("should add one item", async () => {
        assert(await repo.findOne(new Product({id: tempid})) != null);
    });

    it("should update an item", async () => {
        const id = await repo.updateOne(new Product({id: tempid, price: 1}));
    
        assert((await repo.findOne(new Product({id: tempid}))).getPrice() == 1);
    });

    it("should delete an item", () => {
        repo.deleteOne(tempid);
    });
});