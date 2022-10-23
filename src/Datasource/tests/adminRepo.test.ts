import assert from 'assert';

import Admin from "../../Entities/admin";
import AdminRepo from "../adminRepo";
import Repo from "../datasource.types";


describe("Admin Repository", () => {
    let repo: Repo<Admin>;
    let tempid: any;

    before(() => {
        repo = new AdminRepo();
    });

    beforeEach(async () => {
        tempid = await repo.addOne(new Admin({username: 'admin', password: 'admin'}));
    });

    afterEach(() => {
        repo.deleteOne(tempid);
    })

    it("should find all items", async () => {
        const items = await repo.findAll();
    });

    it("should find one item by id", async () => {
        const item = await repo.findOne(new Admin({id: tempid}));

        console.log(item);
        assert(item.getUsername() != null)
    });

    it("should find one item by username", async () => {
        const item = await repo.findOne(new Admin({username: "admin"}));

        console.log(item);
        assert(item.getUsername() != null)
    });

    it("should add one item", async () => {
        const id = await repo.addOne(new Admin({username: "temp", password: "temp"}));

        assert(await repo.findOne(new Admin({username: "admin"})) != null);

        await repo.deleteOne(id);
    });

    it("should update an item", async () => {
        const id = await repo.updateOne(new Admin({id: tempid, username: 'updated'}));

        assert((await repo.findOne(new Admin({id: id}))).getUsername() == 'updated');
    });

    it("should delete an item", () => {
        repo.deleteOne(tempid);
    });
});