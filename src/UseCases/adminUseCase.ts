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

    public async signUp(newAdmin: Admin): Promise<void> {
        try {
            newAdmin.setPassword(await this.crypto.hash(newAdmin.getPassword()));
            await this.adminRepo.addOne(newAdmin);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    public async newProduct(product: Product): Promise<void> {
        try {
            await this.productRepo.addOne(product);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    public async modifyProduct(product: Product): Promise<void> {
        try {
            await this.productRepo.updateOne(product);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    public async deleteProduct(product: Product): Promise<void> {
        try {
            await this.productRepo.deleteOne(product.getId())
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    public async deleteUser(user: User): Promise<void> {
        try {
            await this.userRepo.deleteOne(user.getId());
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    public async modifyUser(user: User): Promise<void> {
        try {
            await this.userRepo.updateOne(user);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

export default AdminUseCase;