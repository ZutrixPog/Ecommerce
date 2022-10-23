import Repo from "../Datasource/datasource.types";
import Order from "../Entities/order";
import Product from "../Entities/product";

class storeUseCase {
    private productRepo: Repo<Product>;
    private orderRepo: Repo<Order>;

    constructor(productRepo: Repo<Product>, orderRepo: Repo<Order>) {
        this.productRepo = productRepo;
        this.orderRepo = orderRepo;
    }
}

export default storeUseCase;