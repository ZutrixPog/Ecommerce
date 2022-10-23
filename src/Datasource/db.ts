import { Pool } from "pg";

const config = require("../config.json");

class Database {
    readonly uri: string = "";

    private static instance: Database;

    private pool: Pool;

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }

    constructor() {
        this.pool = new Pool({
            user: config.db.user,
            host: config.db.host,
            database: config.db.database,
            password: config.db.password,
            port: config.db.port
        });
    }

    public getDB(): Pool {
        return this.pool;
    } 

    public close(): void {
        this.pool.end();
    }
}

export default Database;