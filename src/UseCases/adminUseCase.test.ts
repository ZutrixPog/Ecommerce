import assert from 'assert';
import AdminRepo from '../Datasource/adminRepo';
import ProductRepo from '../Datasource/productRepo';
import UserRepo from '../Datasource/userRepo';
import Admin from '../Entities/admin';
import Product from '../Entities/product';
import User from '../Entities/user';
import BcryptWrapper from '../utils/crypto';
import AdminUserCase from './adminUseCase';

// using fake dependecy is a far better solution but I'm lazy;

const admins = new AdminRepo();      // should be replaced with fake class
const products = new ProductRepo();  // should be replaced with fake class
const crypto = new BcryptWrapper();  // could be replaced
const users = new UserRepo();        // should be replaced with fake class
const adminUsecase = new AdminUserCase(admins, products, users, crypto);

describe("Usecases", () => {
    describe("Admin Usecase", () => {
        let adminId: any;
        let productid: any;
        
        it("should sign a new admin up", async () => {
            const newAdmin = new Admin({username: "admin", password: "admin"});
            adminId = await adminUsecase.signUp(newAdmin);
        });

        it("should authenticate valid admin", async () => {
            const correctUser = "admin";
            const correctPass = "admin";

            assert.equal(false, await adminUsecase.authenticate(correctUser, correctPass), "didnt authenticate valid Admin");
        });

        it("shouldnt authenticate invalid admin", async() => {
            const wrongUser = "wrong";
            const wrongPass = "wrong";

            assert.equal(true, await adminUsecase.authenticate(wrongUser, wrongPass), "authenticated invalid Admin");
        });
    
    
        it("should let admins add products", async () => {
            const newProduct = new Product({name: "test", description: "test", category: 1, addedBy: new Admin({id: 1, username: "Erfan"}), price: 20000});
            const id = await adminUsecase.newProduct(newProduct);
            assert(id != null);
        });
    
        it("should let admins modify products", async () => {
            const productToBeUpdated = new Product({id: productid, name: "test updated", description: "test", category: 1, addedBy: new Admin({id: 1, username: "admin"}), price: 20000});
            const id = await adminUsecase.modifyProduct(productToBeUpdated);
            assert(id != null);
        });
    
        it("should let admins delete products", async () => {
            const id = await adminUsecase.deleteProduct(new Product({id: productid}));

            assert(id == productid);
        });

        it("should let admins remove users", async () => {
            const id = await adminUsecase.deleteUser(new User({id: 1}));

            assert(id != null);
        });

        it("should let admins modify users", async () => {
            const updatedUser = new User({id: 1, username: "updated user"});

            const id = await adminUsecase.modifyUser(updatedUser);
            
            assert(id != null);
        });
    });
})
