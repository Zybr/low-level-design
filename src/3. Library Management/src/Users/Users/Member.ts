import BookItem from "../../Catalog/Books/BookItem";
import AbstractUser from "./AbstractUser";
import Librarian from "./Librarian";
import BookReservation from "../../Reservation/BookReservation";
import BookLend from "../../Lending/BookLend";

export default class Member extends AbstractUser {
  private lendBookNum = 0;

  public isAdmin(): boolean {
    return false;
  }

  public getLendBookNum(): number {
    return this.lendBookNum;
  }

  public increaseLendBookNum(): number {
    return ++this.lendBookNum;
  }

  public decreaseLendBookNum(): number {
    return --this.lendBookNum;
  }

  public reserveItem(item: BookItem): BookReservation {
    return this
      .getLibrarian()
      .reserveBook(this, item);
  }

  public cancelReservation(item: BookItem): BookReservation {
    return this
      .getLibrarian()
      .cancelReservation(this, item);
  }

  public lendItem(item: BookItem): BookLend {
    return this
      .getLibrarian()
      .lendBook(this, item);
  }

  public renewItem(item: BookItem): BookLend {
    return this
      .getLibrarian()
      .renewBook(this, item);
  }

  public returnItem(item: BookItem): BookLend {
    return this
      .getLibrarian()
      .returnBook(item);
  }

  public getFineAmount(item: BookItem): number {
    return this
      .getLibrarian()
      .getFineAmount(item);
  }

  private getLibrarian(): Librarian {
    return this.library.getLibrarian(this);
  }
}
