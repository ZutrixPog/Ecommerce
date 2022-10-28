import Repo from "../Datasource/datasource.types";
import Order from "../Entities/order";
import OrderItem from "../Entities/orderItem";
import User from "../Entities/user";
import Cryptography from "../utils/crypto.types";

class UserUseCase {
    private userRepo: Repo<User>;
    private crypto: Cryptography;

    constructor(userRepo: Repo<User>, crypto: Cryptography) {
        this.userRepo = userRepo;
        this.crypto = crypto;
    }

    public async signUp(user: User): Promise<any> {
        try {
            user.setPassword(await this.crypto.hash(user.getPassword()));
            const id = await this.userRepo.addOne(user);
            return id;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    public async authenticate(username: string, password: string): Promise<boolean> {
        try {
            const user = await this.userRepo.findOne(new User({username}));
            return await this.crypto.compare(password, user.getPassword());
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    public async findById(id: any): Promise<User> {
        try {
            const user = await this.userRepo.findOne(new User({id}));
            return user;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    public async deleteUser(id: any): Promise<any> {
        try {
            const deleted = await this.userRepo.deleteOne(id);
            return deleted;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

export default UserUseCase;