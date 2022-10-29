import express, { Router } from "express";

import AdminController from "../Controllers/adminController";
import auth from "../Controllers/middlewares/auth";
import AdminRepo from "../Datasource/adminRepo";
import ProductRepo from "../Datasource/productRepo";
import UserRepo from "../Datasource/userRepo";
import AdminUseCase from "../UseCases/adminUseCase";
import BcryptWrapper from "../utils/crypto/crypto";
import callBack from "../utils/express/callback";

// instantiating Repositories
const admins = new AdminRepo();
const products = new ProductRepo();
const users = new UserRepo();

// instantiating utils
const crypto = new BcryptWrapper();

// usecase
const usecase = new AdminUseCase(admins, products, users, crypto);

//controller
const controller = new AdminController(usecase);

const router: Router = express.Router();

router.post("/login", callBack(controller.postLogin.bind(controller), 'route'));

router.post("/signup", callBack(controller.postSignUp.bind(controller), 'route'));

router.post("/products", callBack(auth("admin"), "middleware"), callBack(controller.postAddProduct.bind(controller), 'route'));

router.put("/products", callBack(auth("admin"), "middleware"), callBack(controller.putEditProduct.bind(controller), 'route'));

router.put("/users", callBack(auth("admin"), "middleware"), callBack(controller.putEditUser.bind(controller), 'route'));

router.delete("/users", callBack(auth("admin"), "middleware"), callBack(controller.deleteUser.bind(controller), 'route'));

router.delete("/products", callBack(auth("admin"), "middleware"), callBack(controller.deleteProduct.bind(controller), 'route'));

export default router;