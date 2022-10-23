

class User {
    private id: any;
    private username?: string;
    private password?: string;
    private address?: string;

    // Dependencies can be injected in constructor arguments
    constructor(user?: {});
    constructor(user: {id: any, username: string, password: string, address: string}) {
        this.setId(user.id)
            .setUsername(user.username)
            .setPassword(user.password)
            .setAddress(user.address)
    }

    // business logic / validation is implemented in getters and setters
    setId(id: any): User {
        this.id = id;
        return this;
    }

    getId(): any {
        return this.id;
    }

    setUsername(username: string): User {
        this.username = username;
        return this;
    }

    getUsername(): string | undefined {
        return this.username;
    }

    setPassword(password: string): User {
        this.password = password;
        return this;
    }

    getPassword(): string | undefined {
        return this.password;
    }

    setAddress(address: string): User {
        this.address = address;
        return this;
    }

    getAddress(): string | undefined {
        return this.address;
    }

}

export default User;