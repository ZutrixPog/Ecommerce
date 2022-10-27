import User from "../../Entities/user";
import Repo from "../datasource.types";
import getRandomId from "./fakeId";

class FakeUserRepo implements Repo<User> {

    private users: User[];

    constructor() {
        this.users = [
            new User({id: 1, username: 'emad', password: '1234'}),
            new User({id: 2, username: 'erfan', password: '1234'}),
        ]
    }

    async findAll(): Promise<User[]> {
        return this.users;
    }

    async findOne(crit: User): Promise<User> {
        return this.users.filter(user => {
            return user.getId() == crit.getId() || user.getUsername() == crit.getUsername();
        })[0];
    }

    async addOne(user: User): Promise<any> {
        user.setId(getRandomId());
        this.users.push(user);
        return user.getId();
    }

    async updateOne(newOne: User): Promise<any> {
        this.users = this.users.map(user => {
            if (user.getId() == newOne.getId() || user.getUsername() == newOne.getUsername()) {
                return newOne;
            }
            return user;
        });
        return newOne.getId();
    }

    async deleteOne(id: any): Promise<any> {
        this.users = this.users.filter(user => {
            return user.getId() != id;
        });
        return id;
    }
    
    done() {}
}

export default FakeUserRepo;