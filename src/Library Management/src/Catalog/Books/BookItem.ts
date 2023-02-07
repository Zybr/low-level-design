import Book from "./Book";
import Rack from "./Rack";
import Author from "../../Users/People/Author";
import Format from "./Format";
import BookStatus from "./BookStatus";

export default class BookItem extends Book {
  private _borrowedDate: Date
  private _dueDate: Date | null;
  private _status: BookStatus = BookStatus.Available;

  public constructor(
    isbn: string,
    title: string,
    subject: string,
    authors: Author[],
    publicationDate: Date,
    pagesNumber: number,
    format: Format,
    publisher: string,
    language: string,
    private _price: number,
    private _rack: Rack | null,
  ) {
    super(
      isbn,
      title,
      subject,
      authors,
      publicationDate,
      pagesNumber,
      format,
      publisher,
      language,
    );
  }

  get borrowedDate(): Date {
    return this._borrowedDate;
  }

  set borrowedDate(value: Date) {
    this._borrowedDate = value;
  }

  get dueDate(): Date | null {
    return this._dueDate;
  }

  set dueDate(value: Date | null) {
    this._dueDate = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  get rack(): Rack {
    return this._rack;
  }

  set rack(value: Rack) {
    this.rack?.removeItem(this)
    this._rack = value;
    this.rack.addItem(this);
  }

  /** Status setters */

  public free() {
    this._status = BookStatus.Available;
  }

  public reserve() {
    this._status = BookStatus.Reserved;
  }

  public loan() {
    this._status = BookStatus.Loaned;
  }

  public lost() {
    this._status = BookStatus.Lost;
  }

  /** Status getters */

  get isFree() {
    return this._status === BookStatus.Available;
  }

  get isReserved() {
    return this._status === BookStatus.Reserved;
  }

  get isLoaned() {
    return this._status === BookStatus.Loaned;
  }

  get isLost() {
    return this._status === BookStatus.Lost;
  }
}
