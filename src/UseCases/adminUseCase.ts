import Repo from "../Datasource/datasource.types";
import Admin from "../Entities/admin";
import Product from "../Entities/product";
import User from "../Entities/user";
import Cryptography from "../utils/crypto.types";


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

    public async authenticate(username: string, password: string): Promise<boolean> {
        try {
            const admin = await this.adminRepo.findOne(new Admin({username, password}));
    
            if (!admin.getUsername() || !admin.getPassword()) {
                throw new Error("user not found");
            }
    
            return await this.crypto.compare(password, admin.getPassword());      
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    public async signUp(newAdmin: Admin): Promise<any> {
        try {
            newAdmin.setPassword(await this.crypto.hash(newAdmin.getPassword()));
            const id = await this.adminRepo.addOne(newAdmin);
            return id;
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

    public async modifyProduct(product: Product): Promise<any> {
        try {
            const id = await this.productRepo.updateOne(product);
            return id;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    public async deleteProduct(product: Product): Promise<any> {
        try {
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