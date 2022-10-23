import assert from 'assert';
import OrderRepo from '../Datasource/orderRepo';
import ProductRepo from '../Datasource/productRepo';
import storeUseCase from './storeUseCase';


const productRepo = new ProductRepo();
const orderRepo   = new OrderRepo();
const usecase     = new storeUseCase(productRepo, orderRepo);

describe("store usecase", () => {

    it("should ", () => {
        
    });
});