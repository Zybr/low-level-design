import Category from "./Product/Category";
import Product from "./Product/Product";
import Customer from "../Auth/Users/Customer/Customer";
import SearchFilter from "./SearchFilter";

export default class Catalog {
  private readonly categories = new Map<string, Category>()
  private readonly productsCategory = new Map<Product, Category | null>();

  public getCategories(): Category[] {
    return Array.from(this.categories.values());
  }

  public createCategory(name: string): Category {
    if (this.categories.has(name)) {
      throw new Error('There is category with the same name');
    }

    const category = new Category(name);
    this.categories.set(name, category);

    return category;
  }

  public removeCategory(category: Category): void {
    this.categories.delete(category.getName());
  }

  public removeProduct(product: Product): void {
    this.productsCategory.delete(product);
  }

  public createProduct(
    owner: Customer,
    name: string,
    price: number,
    quantity: number,
  ): Product {
    const product = new Product(
      owner,
      name,
      price,
      quantity,
    );

    this.productsCategory.set(product, null);

    return product;
  }

  public getProducts(): Product[] {
    return Array.from(this.productsCategory.keys());
  }

  public getProductCategory(product: Product): Category | null {
    return this.productsCategory.get(product);
  }

  /** TC: 2 * n = O(n); n - products number */
  public search(filter: SearchFilter): Product[] {
    const products = new Set<Product>();

    if (filter.categories?.length) {
      filter.categories.forEach(
        category => category.getProducts()
          .forEach(product => products.add(product))
      );
    }

    if (filter.name) {
      Array.from(this.productsCategory.keys()).forEach(product => {
        if (product.getName() === filter.name) {
          products.add(product);
        }
      })
    }

    return Array.from(products);
  }
}
