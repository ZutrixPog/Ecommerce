import User from "../Entities/user";
import Repo from "./datasource.types";
import Database from "./db";

// should be replaced with a ORM;

class UserRepo implements Repo<User> {

    private db;

    constructor() {
        this.db = Database.getInstance().getDB();
    }

    async findAll(): Promise<User[]> {
        try {
            const query = "SELECT * FROM users";

            const users = (await this.db.query(query)).rows;
            users.map(row => this.queryToUser(row));

            return users;
        } catch(err) {
            console.error(err);
            throw err;
        }
    }
    async findOne(crit: User): Promise<User> {
        try {
            const query = `SELECT * FROM users WHERE ${crit.getId() ? "id=$1" : "username=$1"} LIMIT 1;`;
            const values = [crit.getId() || crit.getUsername()];

            const user = await this.db.query(query, values);
            return this.queryToUser(user.rows[0]);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    async addOne(user: User): Promise<any> {
        try {
            const query = "INSERT INTO users (username, password, address) VALUES ($1, $2, $3) RETURNING id;"
            const values = [user.getUsername(), user.getPassword(), user.getAddress()];

            const added = await this.db.query(query, values);
            return added.rows[0].id;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async updateOne(newOne: User): Promise<any> {
        try {  
            const old = await this.findOne(newOne);
            const query = "UPDATE users SET username = $1, password= $2, address = $3 WHERE id = $4 RETURNING id;";
            const values = [newOne.getUsername() || old.getUsername(),
                old.getPassword() || newOne.getPassword(),
                newOne.getAddress() || old.getAddress(),
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
            const query = "DELETE FROM users WHERE id = $1 RETURNING id;";
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

    queryToUser(row: any): User {
        return new User({
            id: row.id,
            username: row.username,
            password: row.password,
            address: row.address
        });
    }
}

export default UserRepo;