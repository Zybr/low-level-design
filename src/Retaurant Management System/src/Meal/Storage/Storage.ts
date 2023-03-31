import Product from "./Product/Product";
import { ProductType } from "./Product/ProductType";
import Meal from "../Meals/Meal";

export default class Storage {
  private readonly products = new Map<ProductType, Product>();

  public getProducts(): Product[] {
    return Array.from(this.products.values());
  }

  public addProduct(product: Product): void {
    const type = product.getType();
    const lot = this.products.get(type) || new Product(type);
    lot.addWeight(product.getWeight());
    this.products.set(type, product)
  }

  public removeProduct(product: Product): void {
    const type = product.getType();
    const lot = this.products.get(type) || new Product(type);
    lot.subWeight(product.getWeight());
  }

  public removeMeal(meal: Meal): void {
    meal.getProducts()
      .forEach(product => this.removeProduct(product))
  }
}
