import Order from "../Entities/order";
import Repo from "./datasource.types";
import Database from "./db";
import OrderItem from '../Entities/orderItem';
import Product from "../Entities/product";
import User from "../Entities/user";

class OrderRepo implements Repo<Order> {

    private db;

    constructor() {
        this.db = Database.getInstance().getDB();
    }

    async findAll(userId?: any): Promise<Order[]> {
        try {
            const query = "SELECT * FROM orders JOIN users ON users.id = orders.user_id "  + (userId ? `WHERE orders.user_id = ${userId};`: ";");

            const orders = (await this.db.query(query)).rows;
            const res = orders.map(row => this.queryToOrder(row));

            return res;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    async findOne(id: any): Promise<Order> {
        try {
            const query = "SELECT * FROM orders JOIN users ON users.id = orders.user_id WHERE orders.id = $1;";
            const values = [id];

            const order = await this.db.query(query, values);
            return this.queryToOrder(order.rows[0]);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async addOne(order: Order): Promise<any> {
        try {
            const query = "INSERT INTO orders (user_id, total, payment_id) VALUES ($1, $2, $3) RETURNING id;";
            const values = [order.getUser()?.getId(), order.getTotal(), order.getPaymentId()];

            const added = await this.db.query(query, values);
            return added.rows[0].id;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async addOrderItems(order: string | Order, item: OrderItem): Promise<any> {
        try {
            const query = "INSERT INTO order_item (order_id, product_id, amount) VALUES ($1, $2, $3) RETURNING id;";
            const values = [
                order instanceof Order ? order.getId() as string : order, // order id
                item.getProduct()?.getId(),                     // product id
                item.getAmount()                                // amount of product
            ];

            const added = await this.db.query(query, values);
            return added.rows[0].id;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async updateOne(newOne: Order): Promise<any> {
        try {
            const old = await this.findOne(newOne.getId());
            const query = "UPDATE orders SET user_id = $1, total = $2, payment_id = $3 WHERE id = $4 RETURNING id;";
            const values = [
                newOne.getUser()?.getId() || old.getUser()?.getId(),
                newOne.getTotal() || old.getTotal(),
                newOne.getPaymentId() || old.getPaymentId(),
                newOne.getId()
            ];

            const updated = await this.db.query(query, values);
            return updated.rows[0].id;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteOne(id: any): Promise<any> {
        try {
            const query = `DELETE FROM orders WHERE id = ${id};` +
                          `DELETE FROM order_item WHERE order_id = ${id};`;

            await this.db.query(query);
            return id;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    done() {
        this.db.end();
    }

    queryToOrder(row: any): Order {
        return new Order({
            id: row.id,
            user: new User({id: row.user_id, username: row.username, address: row.address}),
            total: row.total,
            paymentId: row.payment_id
        });
    }
}

export default OrderRepo;