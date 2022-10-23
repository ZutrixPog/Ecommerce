import Repo from "../Datasource/datasource.types";
import User from "../Entities/user";

class UserUseCase {
    private userRepo: Repo<User>;

    constructor(userRepo: Repo<User>) {
        this.userRepo = userRepo;
    }
}

export default UserUseCase;