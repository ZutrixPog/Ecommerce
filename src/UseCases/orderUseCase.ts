import Repo from "../Datasource/datasource.types";
import OrderItemRepo from "../Datasource/orderItemRepo";
import OrderRepo from "../Datasource/orderRepo";
import Order from "../Entities/order";
import OrderItem from "../Entities/orderItem";
import Product from "../Entities/product";
import User from "../Entities/user";

class OrderUseCase {
    private orderRepo: Repo<Order>;
    private orderItemRepo: Repo<OrderItem>;
    private productRepo: Repo<Product>;

    constructor(orderRepo: Repo<Order>, orderItemRepo: Repo<OrderItem>, productRepo: Repo<Product>) {
        this.orderRepo = orderRepo;
        this.orderItemRepo = orderItemRepo;
        this.productRepo = productRepo;
    }

    public async findUserOrders(user: User): Promise<Order[]> {
        try {
            const orders = await (this.orderRepo as OrderRepo).findAll(user.getId());

            return orders;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    public async getOrderItems(orderId: any): Promise<OrderItem[]> {
        try {
            const items = await (this.orderItemRepo as OrderItemRepo).findAllByOrder(orderId);

            return items;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    public async create(order: Order, items: OrderItem[]): Promise<any> {
        try {
            const orderid = await this.orderRepo.addOne(order);

            let total = 0;
            for (const item of items) {
                const product = await this.productRepo.findOne(item.getProduct());
                if (product === null) {
                    continue;
                }
                item.setOrder(new Order({id: orderid}));
                await this.orderItemRepo.addOne(item);
                total += item.getAmount() as number * product.getPrice();
            }

            order.setId(orderid);
            order.setTotal(total);
            await this.orderRepo.updateOne(order);

            return orderid;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    public async cancel(id: any, userid: any): Promise<any> {
        try {
            const order = await this.orderRepo.findOne(id);

            if (order.getUser()?.getId() != userid) {
                throw new Error("you cant cancel someone else's order");
            }

            const orderid = await this.orderRepo.deleteOne(id);

            return orderid;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

export default OrderUseCase;