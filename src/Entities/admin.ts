
class Admin {
    private id?: string;
    private username?: string;
    private password?: string;

    // Dependencies can be injected in constructor arguments
    constructor(admin?: {});
    constructor(admin: {id?: any, username: string, password: string}) {
        this.setId(admin.id)
            .setUsername(admin.username)
            .setPassword(admin.password)
    }

    // business logic / validation is implemented in getters and setters
    setId(id: any): Admin {
        this.id = id;
        return this;
    }

    getId(): any {
        return this.id;
    }

    setUsername(username: string): Admin {
        this.username = username;
        return this;
    }

    getUsername(): string | undefined {
        return this.username;
    }

    setPassword(password: string): Admin {
        this.password = password;
        return this;
    }

    getPassword(): string | undefined {
        return this.password;
    }
}

export default Admin;