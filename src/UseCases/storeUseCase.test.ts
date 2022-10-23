import assert from 'assert';
import OrderRepo from '../Datasource/orderRepo';
import ProductRepo from '../Datasource/productRepo';
import Product from '../Entities/product';
import storeUseCase from './storeUseCase';


const productRepo = new ProductRepo();
const usecase     = new storeUseCase(productRepo);

describe("store usecase", () => {

    it("should retrieve all products", async () => {
        const products = await usecase.getAllProducts();

        assert(products != null);
    });

    it("should retrieve products by category", async () => {
        const products = await usecase.getProductsByCategory(1);

        assert(products != null);
    });

    it("should find one product", async () => {
        const product = await usecase.getProduct(new Product({id: 1}));

        assert(product != null);
    });
});