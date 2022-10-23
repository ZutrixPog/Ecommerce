import Admin from "../Entities/admin";
import Product from "../Entities/product";
import Repo from "./datasource.types";
import Database from "./db";

class ProductRepo implements Repo<Product> {

    private db;

    constructor() {
        this.db = Database.getInstance().getDB();
    }

    async findAll(): Promise<Product[]> {
        try {
            const query = "SELECT * FROM products JOIN categories ON products.category = categories.id JOIN admins ON admins.id = products.addedby;";

            let products = (await this.db.query(query)).rows;
            products.map((row) => this.queryResultToProduct(row));

            return products;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async findOne(crit: Product): Promise<Product> {
        try {
            const query = `SELECT * FROM products INNER JOIN categories ON products.category = categories.id INNER JOIN admins ON admins.id = products.addedby WHERE ${(crit.getId() ? "products.id=$1 " : crit.getName() ? "name=$1 " : "category=$1")};`;
            const values = [crit.getId() || crit.getName() || crit.getCategory()];

            const product = await this.db.query(query, values);
            return this.queryResultToProduct(product.rows[0]);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async addOne(product: Product): Promise<any> {
        try {
            const query = "INSERT INTO products (name, description, category, addedBy, price) VALUES ($1, $2, $3, $4, $5) RETURNING id;";
            const values = [
                product.getName(),
                product.getDescription(),
                product.getCategory(),
                product.getAddedBy()?.getId(),
                product.getPrice()
            ];

            const added = await this.db.query(query, values);
            return added.rows[0].id;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async updateOne(newOne: Product): Promise<any> {
        try {
            const old = await this.findOne(newOne);
            const query = `UPDATE products SET name = $1 ,description = $2 ,category = $3 ,addedBy = $4 ,price = $5 WHERE id = $6 RETURNING id;`;
            const values = [
                newOne.getName() || old.getName(),
                newOne.getDescription() || old.getDescription(),
                newOne.getCategory() || 1,
                newOne.getAddedBy()?.getId() || old.getAddedBy()?.getId(),
                newOne.getPrice() || old.getPrice(),
                newOne.getId()
            ];

            const updated = await this.db.query(query, values);
            return updated.rows[0].id;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    async deleteOne(id: any): Promise<any> {
        try {
            const query = "DELETE FROM products WHERE id = $1 RETURNING id;";
            const values = [
                id
            ];

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

    private queryResultToProduct(row: any): Product {
        const product = new Product({
            id: row.id,
            name: row.name,
            description: row.description,
            category: row.category_name,
            price: row.price,
            addedBy: new Admin({id: row.addedby, username: row.username})
        });

        return product;
    }
}

export default ProductRepo;