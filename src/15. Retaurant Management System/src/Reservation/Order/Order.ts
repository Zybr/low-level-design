import Table from "../../Table/Table";
import Item from "../../Meal/Menu/Item";

export default class Order {
  public constructor(
    private readonly table: Table,
    private readonly items: Item[]
  ) {
  }

  public getTable(): Table {
    return this.table;
  }

  public getItems(): Item[] {
    return this.items;
  }

  public getCost(): number {
    return this.getItems()
      .reduce(
        (sum, item) => sum + item.getPrice(),
        0
      );
  }
}
