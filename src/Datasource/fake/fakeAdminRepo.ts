import { QueryResult } from "pg";

import Admin from "../../Entities/admin";
import Repo from "../datasource.types";
import getRandomId from "./fakeId";

// should be replaced with an ORM;

class FakeAdminRepo implements Repo<Admin> {

    private admins: Admin[];

    constructor() {
        this.admins = [
            new Admin({id: 2, username: 'Erfan', password: '$2b$10$r4oCXO9Bjo6tK92YFDHfLuafxGU.mYK9WojgKZbiGOHL16u517R8S'}),
        ];
    }
    
    async findAll(): Promise<Admin[]> {
        return this.admins;
    }

    async findOne(crit: Admin): Promise<Admin> {
        return this.admins.filter((admin) => {
            return admin.getId() == crit.getId() || admin.getUsername() == crit.getUsername(); 
        })[0];
    }

    async addOne(admin: Admin): Promise<any> {
        admin.setId(getRandomId());
        this.admins.push(admin);
        return admin.getId;
    }

    async updateOne(newOne: Admin): Promise<any> {
        this.admins = this.admins.map(admin => {
            if (admin.getId() == newOne.getId()) {
                return newOne;
            }
            return admin;
        });
        return newOne.getId();
    }

    async deleteOne(id: any): Promise<any> {
        this.admins = this.admins.filter(admin => {
            return admin.getId() != id;
        });
        return id;
    }

    done() {}
}

export default FakeAdminRepo;