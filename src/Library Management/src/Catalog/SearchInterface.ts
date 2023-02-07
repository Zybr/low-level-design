import BookItem from "./Books/BookItem";
import Author from "../Users/People/Author";

export default interface SearchInterface {
  searchByTitle(title: string): BookItem[];

  searchBySubject(subject: string): BookItem[];

  searchByAuthor(author: Author): BookItem[];

  searchByPublicationDate(date: Date): BookItem[];
}
