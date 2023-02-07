import SearchInterface from "./SearchInterface";
import BookItem from "./Books/BookItem";
import Author from "../Users/People/Author";

export default class Catalog implements SearchInterface {
  private readonly bookItems: BookItem[] = [];

  public addItem(bookItem: BookItem): this {
    this.bookItems.push(bookItem);
    return this;
  }

  public searchByAuthor(author: Author): BookItem[] {
    return this.bookItems.filter(item => item.authors.includes(author));
  }

  public searchByPublicationDate(date: Date): BookItem[] {
    return this.bookItems.filter(
      item =>
        item.publicationDate.getFullYear() === date.getFullYear()
        && item.publicationDate.getMonth() === date.getMonth()
        && item.publicationDate.getDate() === date.getDate()
    )
  }

  public searchBySubject(subject: string): BookItem[] {
    return this.bookItems.filter(item => item.subject === subject)
  }

  public searchByTitle(title: string): BookItem[] {
    return this.bookItems.filter(item => item.title === title);
  }
}
