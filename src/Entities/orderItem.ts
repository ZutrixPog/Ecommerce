import Order from "./order";
import Product from "./product";

class OrderItem {
    private id: any;
    private order?: Order;
    private product?: Product;
    private amount?: number;

    constructor(orderItem?: {});
    constructor(orderItem: {id: any, order: Order, product: Product, amount: number}) {
        this.setId(orderItem.id)
            .setOrder(orderItem.order)
            .setProduct(orderItem.product)
            .setAmount(orderItem.amount);
    }

    setId(id: any): OrderItem {
        this.id = id;
        return this;
    }

    getId(): any {
        return this.id;
    }

    setProduct(product: Product): OrderItem {
        this.product = product;
        return this;
    }

    getProduct(): Product | undefined {
        return this.product;
    }

    setOrder(order: Order): OrderItem {
        this.order = order;
        return this;
    }

    getOrder(): Order | undefined {
        return this.order;
    }

    setAmount(amount: number): OrderItem {
        this.amount = amount;
        return this;
    }

    getAmount(): number | undefined {
        return this.amount;
    }
}

export default OrderItem;