import Item from "./Item";
import Location from "./Location";

export default class Order {
  public constructor(
    private readonly items: Item[],
    private location: Location,
  ) {
  }

  public getItems(): Item[] {
    return this.items.map(item => item);
  }

  public getSize(): number {
    return this.items
      .reduce(
        (size, item) => size + item.getSize(),
        0
      );
  }
}
