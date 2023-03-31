import Product from "./Product";

export default class ProductsRepository {
  private static readonly products: {
    [key: number]: Product
  } = {};

  private static instance: ProductsRepository;

  private constructor() {
  }


  public static getInstance(): ProductsRepository {
    if (!this.instance) {
      this.instance = new ProductsRepository();
    }

    return this.instance;
  }

  public getProducts(): Product[] {
    const products: Product[] = [];

    Object.keys(ProductsRepository.products)
      .forEach(id => products.push(this.getProduct(id as unknown as number)))

    return products;
  }

  public getProduct(id: number): Product {
    const product = ProductsRepository.products[id];

    if (!product) {
      throw new Error('Product is not defined');
    }

    return product;
  }

  public createProduct(name: string, price: number): Product {
    const product = Product.create(name, price);

    ProductsRepository.products[product.getId()] = product;

    return product;
  }
}
