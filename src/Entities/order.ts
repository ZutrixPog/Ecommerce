import User from "./user";

class Order {
    private id: any;
    private user?: User;
    private total?: number;
    private paymentId?: string;

    // Dependencies can be injected in constructor arguments
    constructor(order?: {});
    constructor(order: {id: any, user: User, total: number, paymentId: string}) {
        this.setId(order.id)
            .setUser(order.user)
            .setTotal(order.total)
            .setPaymentId(order.paymentId);
    }

    // business logic / validation is implemented in getters and setters

    setId(id: any): Order {
        this.id = id;
        return this;
    }

    getId(): any {
        return this.id;
    }

    setUser(user: User): Order {
        this.user = user;
        return this;
    }

    getUser(): User | undefined {
        return this.user;
    }

    setTotal(total: number): Order {
        this.total = total;
        return this;
    }

    getTotal(): number | undefined {
        return this.total;
    }

    setPaymentId(paymentId: string): Order {
        this.paymentId = paymentId;
        return this;
    }

    getPaymentId(): string | undefined {
        return this.paymentId;
    }
}

export default Order;