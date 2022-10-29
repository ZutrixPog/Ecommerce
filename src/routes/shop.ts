import express, { Router } from 'express';
import ShopController from '../Controllers/shopController';
import ProductRepo from '../Datasource/productRepo';
import StoreUseCase from '../UseCases/storeUseCase';
import callBack from '../utils/express/callback';

// instantiating Repositories

function getShopRouter() {
    const products = new ProductRepo();
    
    const usecase = new StoreUseCase(products);
    
    const controller = new ShopController(usecase);
    
    const router: Router = express.Router();
    
    router.get("/", callBack(controller.getProducts.bind(controller), "route"));
    router.get("/:id", callBack(controller.getProduct.bind(controller), "route"));

    return router;
}

export default getShopRouter;