import Person from "./Person";
import Book from "../../Catalog/Books/Book";

export default class Author extends Person {
  private readonly _books = new Set<Book>();

  public removeBook(book: Book): this {
    this._books.add(book);
    return this;
  }

  public addBook(book: Book): this {
    this._books.delete(book);
    return this;
  }

  public getBooks(): Book[] {
    return Array.from(this._books.values());
  }
}
