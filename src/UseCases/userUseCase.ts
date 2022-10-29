import Repo from "../Datasource/datasource.types";
import Order from "../Entities/order";
import OrderItem from "../Entities/orderItem";
import User from "../Entities/user";
import Cryptography from "../utils/crypto/crypto.types";
import { genToken } from "../utils/token/token";

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

            const token = genToken({
                id: user.getId(),
                username: user.getUsername(),
                access: "user"
            });
            
            return token;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    public async authenticate(username: string, password: string): Promise<any> {
        try {
            const user = await this.userRepo.findOne(new User({username}));

            if (!user) {
                throw new Error("user not found");
            }

            if (!(await this.crypto.compare(password, user.getPassword()))) {
                throw new Error("Username or Password is not correct");
            }

            const token = genToken({
                id: user.getId(),
                username: user.getUsername(),
                access: "user"
            });

            return token;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    public async findById(id: any): Promise<User> {
        try {
            const user = await this.userRepo.findOne(new User({id: id}));
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