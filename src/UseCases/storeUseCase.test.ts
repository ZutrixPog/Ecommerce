import assert from 'assert';
import FakeProductRepo from '../Datasource/fake/fakeProductRepo';
import Product from '../Entities/product';
import StoreUseCase from './storeUseCase';


const productRepo = new FakeProductRepo();
const usecase     = new StoreUseCase(productRepo);

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