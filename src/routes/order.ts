import express, { Router } from 'express';
import auth from '../Controllers/middlewares/auth';
import OrderController from '../Controllers/orderController';
import OrderItemRepo from '../Datasource/orderItemRepo';
import OrderRepo from '../Datasource/orderRepo';
import ProductRepo from '../Datasource/productRepo';
import OrderUseCase from '../UseCases/orderUseCase';
import callBack from '../utils/express/callback';

// instantiating Repositories
const orders = new OrderRepo();
const orderItems = new OrderItemRepo();
const products = new ProductRepo();

// instantiating usecase
const usecase = new OrderUseCase(orders, orderItems, products);

// instantiating controller
const controller = new OrderController(usecase);

const router: Router = express.Router();

router.get("/", callBack(auth("user"), "middleware"), callBack(controller.getOrders.bind(controller), "route"));

router.post("/", callBack(auth("user"), "middleware"), callBack(controller.postMakeOrder.bind(controller), "route"));

router.delete("/", callBack(auth("user"), "middleware"), callBack(controller.deleteCancelOrder.bind(controller), "route"));

export default router;