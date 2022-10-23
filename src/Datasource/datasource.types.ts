interface Repo<T> {
    findAll(): Promise<Array<T>>;
    findOne(id: any): Promise<T>;
    addOne(n: T): any;
    updateOne(newOne: T): any;
    deleteOne(id: any): any;
    done(): void;
}

export default Repo;