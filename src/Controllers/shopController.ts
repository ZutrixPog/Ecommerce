import Product from "../Entities/product";
import StoreUseCase from "../UseCases/storeUseCase";
import { IRequest, IResponse } from "./controller.types";


class ShopController {
    private headers = {
        'Content-Type': 'application/json'
    };

    private storeUsecase: StoreUseCase;

    constructor(storeUseCase: StoreUseCase) {
        this.storeUsecase = storeUseCase;
    }

    public async getProducts(req: IRequest): Promise<IResponse> {
        try {
            let products: Product[];
            if (!req.query.category) {
                products = await this.storeUsecase.getAllProducts();
            } else {
                products = await this.storeUsecase.getProductsByCategory(req.query.category);
            }

            return {
                headers: this.headers,
                status: 200,
                body: {
                    products: products.map(prod => prod.asRes())
                }
            };
        } catch (err: any) {
            console.error(err);
            return {
                headers: this.headers,
                status: 400,
                body: {
                    error: err.message
                }
            }
        }
    }

    public async getProduct(req: IRequest): Promise<IResponse> {
        try {
            const {id} = req.params;

            const product = await this.storeUsecase.getProduct(id);

            return {
                headers: this.headers,
                status: 200,
                body: {
                    product: product.asRes()
                }
            };
        } catch (err: any) {
            console.error(err);
            return {
                headers: this.headers,
                status: 400,
                body: {
                    error: err.message
                }
            }
        }
    }
}

export default ShopController;