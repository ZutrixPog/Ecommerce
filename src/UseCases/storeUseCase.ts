import Repo from "../Datasource/datasource.types";
import ProductRepo from "../Datasource/productRepo";
import Order from "../Entities/order";
import Product from "../Entities/product";
import cat from '../Datasource/categories';

class StoreUseCase {
    private productRepo: Repo<Product>;

    constructor(productRepo: Repo<Product>) {
        this.productRepo = productRepo;
    }

    public async getAllProducts(): Promise<Product[]> {
        try {
            const products = await this.productRepo.findAll();

            return products;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    public async getProductsByCategory(category: string | number): Promise<Product[]> {
        try {
            if (typeof category === 'string') {
                category = await cat.categoryToTag(category);
            } else {
                category = await cat.tagToCategory(category);
            }

            const products = await (this.productRepo as ProductRepo).findAll(category);
            return products;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    public async getProduct(id: any): Promise<Product> {
        try {
            const product = await this.productRepo.findOne(id);

            return product;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

export default StoreUseCase;