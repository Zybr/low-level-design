import Author from "../../Users/People/Author";
import Format from "./Format";

export default class Book {
  public constructor(
    protected _isbn: string,
    protected _title: string,
    protected _subject: string,
    protected _authors: Author[],
    protected _publicationDate: Date,
    protected _pagesNumber: number,
    protected _format: Format,
    protected _publisher: string,
    protected _language: string,
  ) {
  }

  get isbn(): string {
    return this._isbn;
  }

  set isbn(value: string) {
    this._isbn = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get subject(): string {
    return this._subject;
  }

  set subject(value: string) {
    this._subject = value;
  }

  get authors(): Author[] {
    return this._authors;
  }

  set authors(value: Author[]) {
    if (!value.length) {
      throw new Error(`Authors list can't be empty.`);
    }
    this._authors.forEach(author => author.removeBook(this))
    this._authors = value;
    this._authors.forEach(author => author.addBook(this));
  }

  get publicationDate(): Date {
    return this._publicationDate;
  }

  set publicationDate(value: Date) {
    this._publicationDate = value;
  }

  get pagesNumber(): number {
    return this._pagesNumber;
  }

  set pagesNumber(value: number) {
    this._pagesNumber = value;
  }

  get format(): Format {
    return this._format;
  }

  set format(value: Format) {
    this._format = value;
  }

  get publisher(): string {
    return this._publisher;
  }

  set publisher(value: string) {
    this._publisher = value;
  }

  get language(): string {
    return this._language;
  }

  set language(value: string) {
    this._language = value;
  }
}
