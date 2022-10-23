import Order from "../Entities/order";
import Repo from "./datasource.types";
import Database from "./db";
import OrderItem from '../Entities/orderItem';
import Product from "../Entities/product";

class OrderItemRepo implements Repo<OrderItem> {

    private db;

    constructor() {
        this.db = Database.getInstance().getDB();
    }

    async findAll(): Promise<OrderItem[]> {
        try {
            const query = `SELECT * FROM order_item JOIN products ON products.id = order_item.product_id;`;
            
            const orderItems = (await this.db.query(query)).rows;
            orderItems.map(row => this.queryToOrderItem(row));
            return orderItems;
        } catch(err) {
            console.error(err);
            throw err;
        }
    }

    async findAllByOrder(orderId: any): Promise<OrderItem[]> {
        try {
            const query = `SELECT * FROM order_item JOIN products ON products.id = order_item.product_id WHERE order_id=$1;`;
            const values = [orderId];
            
            const orderItems = (await this.db.query(query, values)).rows;
            orderItems.map(row => this.queryToOrderItem(row));
            return orderItems;
        } catch(err) {
            console.error(err);
            throw err;
        }
    }

    async findOne(id: any): Promise<OrderItem> {
        try {
            const query = "SELECT * FROM order_item JOIN products ON products.id = order_item.product_id WHERE order_item.id = $1;";
            const values = [id];

            const orderItem = await this.db.query(query, values);
            return this.queryToOrderItem(orderItem.rows[0]);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async addOne(item: OrderItem): Promise<any> {
        try {
            const query = "INSERT INTO order_item (order_id, product_id, amount) VALUES ($1, $2, $3) RETURNING id;";
            const values = [
                item.getOrder()?.getId(),      // order id
                item.getProduct()?.getId(),  // product id
                item.getAmount()             // amount of product
            ];

            const added = await this.db.query(query, values);
            return added.rows[0].id;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async updateOne(newOne: OrderItem): Promise<any> {
        try {
            const query = "UPDATE order_item SET amount = $1 WHERE id = $2 RETURNING id;";
            const values = [
                newOne.getAmount(),
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
            const query = "DELETE FROM order_item WHERE id = $1 RETURNING id;";
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

    private queryToOrderItem(row: any): OrderItem {
        return new OrderItem({
            id: row.id,
            order: new Order({id: row.order_id}),
            Product: new Product({id: row.product_id, name: row.name, description: row.description, category: row.category, addedBy: row.addedby, price: row.price}),
            amount: row.amount
        });
    }
}

export default OrderItemRepo;