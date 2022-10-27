import Admin from "../../Entities/admin";
import Product from "../../Entities/product";
import Repo from "../datasource.types";
import getRandomId from "./fakeId";

class FakeProductRepo implements Repo<Product> {

    private products: Product[];

    constructor() {
        this.products = [
            new Product({id: 1, name: 'test', description: 'test', category: 1, addedBy: new Admin({id:1}), price: 5000}),
            new Product({id: 2, name: 'test2', description: 'test2', category: 1, addedBy: new Admin({id:1}), price: 4000}),
            new Product({id: 3, name: 'test3', description: 'test3', category: 1, addedBy: new Admin({id:1}), price: 2000}),
        ]
    }

    async findAll(category?: any): Promise<Product[]> {
        if (category) {
            return this.products.filter(product => {
                return product.getCategory() == category;
            });
        }
        return this.products;
    }

    async findOne(crit: Product): Promise<Product> {
        return this.products.filter(product => {
            return product.getName() == crit.getName() || product.getId() == crit.getId();
        })[0];
    }

    async addOne(product: Product): Promise<any> {
        product.setId(getRandomId());
        this.products.push(product);
        return product.getId();
    }

    async updateOne(newOne: Product): Promise<any> {
        this.products = this.products.map(product => {
            if (product.getId() == newOne.getId() || product.getName() == newOne.getName()) {
                return newOne;
            }
            return product;
        });
        return 1;
    }

    async deleteOne(id: any): Promise<any> {
        this.products = this.products.filter(product => {
            return product.getId() != id;
        });
        return id;
    }

    done() {}
}

export default FakeProductRepo;