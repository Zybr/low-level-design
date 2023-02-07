import BookItem from "./BookItem";
import Book from "./Book";

export default class Rack {
  private readonly items = new Set<Book>();

  public constructor(
    private readonly location: string,
  ) {
  }

  public addItem(item: BookItem): this {
    this.items.add(item);
    item.rack = this;
    return this;
  }

  public removeItem(item: BookItem): this {
    this.items.delete(item);
    item.rack = null;
    return this;
  }
}
