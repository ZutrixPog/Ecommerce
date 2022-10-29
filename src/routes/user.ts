import express, { Router } from "express";
import auth from "../Controllers/middlewares/auth";
import UserController from "../Controllers/userController";
import UserRepo from "../Datasource/userRepo";
import UserUseCase from "../UseCases/userUseCase";
import BcryptWrapper from "../utils/crypto/crypto";
import callBack from "../utils/express/callback";

// instantiating Repositories
const users = new UserRepo();

// instantiating utils
const crypto = new BcryptWrapper();

const usecase = new UserUseCase(users, crypto);

const controller = new UserController(usecase);

const router: Router = express.Router();

router.post("/login", callBack(controller.postLogin.bind(controller), "route"));

router.post("/signup", callBack(controller.postSignUp.bind(controller), "route"));

router.get("/:id", callBack(auth("user"), "middleware"), callBack(controller.getUser.bind(controller), "route"));

router.delete("/", callBack(auth("user"), "middleware"), callBack(controller.deleteUser.bind(controller), "route"));

export default router;