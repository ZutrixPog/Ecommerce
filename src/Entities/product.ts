import Admin from "./admin";

class Product {
    private id: any;
    private name?: string;
    private description?: string;
    private category?: string;
    private addedBy?: Admin;
    private price?: number;

    // Dependencies can be injected in constructor arguments
    constructor(product?: {});
    constructor(product: {id?: any, name: string, description: string, category: string, addedBy: Admin, price: number}) {
        this.setId(product.id)
            .setName(product.name)
            .setDescription(product.description)
            .setCategory(product.category)
            .setAddedBy(product.addedBy)
            .setPrice(product.price)
    }

    // business logic / validation is implemented in getters and setters

    setId(id: any): Product {
        this.id = id;
        return this;
    }

    getId(): string {
        return this.id;
    }

    setName(name: string): Product {
        this.name = name;
        return this;
    }

    getName(): any {
        return this.name;
    }

    setDescription(desc: string): Product {
        this.description = desc;
        return this;
    }

    getDescription(): string | undefined {
        return this.description;
    }

    setCategory(cat: string): Product {
        this.category = cat;
        return this;
    }

    getCategory(): string | undefined {
        return this.category;
    }

    setAddedBy(by: Admin): Product {
        this.addedBy = by;
        return this;
    }

    getAddedBy(): Admin | undefined {
        return this.addedBy;
    }

    setPrice(price: number): Product {
        this.price = price;
        return this;
    }

    getPrice(): number | undefined {
        return this.price;
    }
}

export default Product;