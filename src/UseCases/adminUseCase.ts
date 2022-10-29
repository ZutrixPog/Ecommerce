import Repo from "../Datasource/datasource.types";
import Admin from "../Entities/admin";
import Product from "../Entities/product";
import User from "../Entities/user";
import Cryptography from "../utils/crypto/crypto.types";
import { genToken } from "../utils/token/token";


class AdminUseCase {
    private adminRepo: Repo<Admin>;
    private productRepo: Repo<Product>;
    private userRepo: Repo<User>;
    private crypto: Cryptography;

    constructor(adminRepo: Repo<Admin>, productRepo: Repo<Product>, userRepo: Repo<User>, crypto: Cryptography) {
        this.adminRepo = adminRepo;
        this.productRepo = productRepo;
        this.userRepo = userRepo;
        this.crypto    = crypto;
    }

    public async authenticate(username: string, password: string): Promise<any> {
        try {
            const admin = await this.adminRepo.findOne(new Admin({username, password}));

            if (!admin || !admin.getUsername() || !admin.getPassword()) {
                throw new Error("user not found");
            }

            if (!(await this.crypto.compare(password, admin.getPassword()))) {
                throw new Error("Username or Password is not correct");
            }

            const token = genToken({
                id: admin.getId(),
                username: admin.getUsername(),
                access: "admin"
            });
    
            return token;      
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async signUp(newAdmin: Admin): Promise<any> {
        try {
            newAdmin.setPassword(await this.crypto.hash(newAdmin.getPassword()));
            const id = await this.adminRepo.addOne(newAdmin);

            const token = genToken({
                id: newAdmin.getId(),
                username: newAdmin.getUsername(),
                access: "admin"
            });

            return token;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    public async newProduct(product: Product): Promise<any> {
        try {
            const id = await this.productRepo.addOne(product);
            return id;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    public async modifyProduct(product: Product, adminId: any): Promise<any> {
        try {
            const prod = await this.productRepo.findOne(product);

            if (!prod) {
                throw new Error("Product not found");
            }

            if (prod.getAddedBy()?.getId() != adminId) {
                throw new Error("not Authorized");
            }

            const id = await this.productRepo.updateOne(product);
            return id;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    public async deleteProduct(product: Product, adminId: any): Promise<any> {
        try {
            const prod = await this.productRepo.findOne(product);
            if (prod.getAddedBy()?.getId() != adminId) {
                throw new Error("not Authorized");
            }

            const id = await this.productRepo.deleteOne(product.getId());
            return id;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    public async deleteUser(user: User): Promise<any> {
        try {
            const id = await this.userRepo.deleteOne(user.getId());
            return id;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    public async modifyUser(user: User): Promise<any> {
        try {
            const id = await this.userRepo.updateOne(user);
            return id;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

export default AdminUseCase;