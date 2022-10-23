import assert from 'assert';

import Admin from "../../Entities/admin";
import User from '../../Entities/user';
import AdminRepo from "../adminRepo";
import Repo from "../datasource.types";
import UserRepo from '../userRepo';


describe("User Repository", () => {
    let repo: Repo<User>;
    let tempid: any;

    before(() => {
        repo = new UserRepo();
    });

    beforeEach(async () => {
        tempid = await repo.addOne(new User({username: 'user', password: 'user', address: '12 shit street'}));
    });

    afterEach(() => {
        repo.deleteOne(tempid);
    })

    it("should find all items", async () => {
        const items = await repo.findAll();
    });

    it("should find one item by id", async () => {
        const item = await repo.findOne(new User({id: tempid}));

        console.log(item);
        assert(item.getUsername() == 'user');
    });

    it("should find one item by username", async () => {
        const item = await repo.findOne(new User({username: "user"}));

        console.log(item);
        assert(item.getUsername() == 'user');
    });

    it("should add one item", async () => {
        const id = await repo.addOne(new User({username: "temp", password: "temp", address: "10 fuck street"}));

        assert(await repo.findOne(new User({username: "temp"})) != null);

        await repo.deleteOne(id);
    });

    it("should update an item", async () => {
        const id = await repo.updateOne(new User({id: tempid, username: 'updated'}));

        assert((await repo.findOne(new User({id: id}))).getUsername() == 'updated');
    });

    it("should delete an item", () => {
        repo.deleteOne(tempid);
    });
});