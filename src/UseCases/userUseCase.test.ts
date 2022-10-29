import FakeOrderItemRepo from "../Datasource/fake/fakeOrderItemRepo";
import FakeOrderRepo from "../Datasource/fake/fakeOrderRepo";
import assert from 'assert';

import FakeUserRepo from "../Datasource/fake/fakeUserRepo";
import User from "../Entities/user";
import UserUseCase from "./userUseCase";
import BcryptWrapper from "../utils/crypto/crypto";

const crypto = new BcryptWrapper();
const users = new FakeUserRepo();
const usecase = new UserUseCase(users, crypto);

describe("User Usecase", () => {
    let userid: any;

    it("should sign a new user up", async () => {
        const newAdmin = new User({username: "user", password: "user", address: "some place some number some street"});
        userid = await usecase.signUp(newAdmin);
    });

    it("should authenticate valid users", async () => {
        const correctUser = "user";
        const correctPass = "user";

        assert.notEqual(null, await usecase.authenticate(correctUser, correctPass), "didnt authenticate valid user");
    });

    it("shouldn't authenticate invalid users", async () => {
        const wrongUser = "wrong";
        const wrongPass = "wrong";

        assert.equal(null, await usecase.authenticate(wrongUser, wrongPass), "authenticated invalid user");
    });
    
    it("should get users info by id", async () => {
        const user = await usecase.findById(userid);
        assert.notEqual(user, null);
    });

    it("should delete a user", async () => {
        const id = await usecase.deleteUser(userid);

        assert.notEqual(id, null);
    });

});