import { QueryResult } from "pg";

import Admin from "../Entities/admin";
import Repo from "./datasource.types";
import Database from "./db";

// should be replaced with an ORM;

class AdminRepo implements Repo<Admin> {

    private db;

    constructor() {
        this.db = Database.getInstance().getDB();
    }
    
    async findAll(): Promise<Admin[]> {
        try {
            const query = "SELECT * FROM admins";
            const admins = (await this.db.query(query)).rows;
            admins.map((row) => this.resultToAdmin(row));

            return admins;
        } catch(err) {
            console.error(err);
            throw err;
        }
    }

    async findOne(crit: Admin): Promise<Admin> {
        try {
            const query = `SELECT * FROM admins WHERE ${crit.getId() ? "id=$1" : "username=$1"} LIMIT 1;`;
            
            const values = [crit.getId() || crit.getUsername()];

            const admin = await this.db.query(query, values);
            
            return this.resultToAdmin(admin.rows[0]);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async addOne(admin: Admin): Promise<any> {
        try {
            const query = "INSERT INTO admins (username, password) VALUES ($1, $2) RETURNING id;"
            const values = [admin.getUsername(), admin.getPassword()];

            const added = await this.db.query(query, values);
            return added.rows[0].id;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async updateOne(newOne: Admin): Promise<any> {
        try {  
            const old = await this.findOne(newOne);
            const query = "UPDATE admins SET username = $1, password= $2 WHERE id = $3 RETURNING id;";
            const values = [newOne.getUsername() || old.getUsername(),
                newOne.getPassword() || old.getPassword(), 
                newOne.getId() || old.getId()];

            const updated = await this.db.query(query, values);
            return updated.rows[0].id;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async deleteOne(id: any): Promise<any> {
        try {
            const query = "DELETE FROM admins WHERE id = $1 RETURNING id;";
            const values = [id];

            const deleted = await this.db.query(query, values);
            return deleted.rows[0].id;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    done() {
        this.db.end();
    }

    resultToAdmin(row: any) {
        return new Admin({id: row.id, username: row.username, password: row.password});
    }
}

export default AdminRepo;