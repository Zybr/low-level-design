import Meal from "../Meals/Meal";
import Item from "./Item";

export default class Section {
  private readonly items = new Set<Item>();

  public constructor(
    private readonly name: string,
  ) {
  }

  public getName(): string {
    return this.name;
  }

  public getItems(): Item[] {
    return Array.from(this.items.values());
  }

  public addItem(meal: Meal, price: number): void {
    this.items.add(new Item(meal, price));
  }

  public removeItem(item: Item): void {
    this.items.delete(item);
  }
}
