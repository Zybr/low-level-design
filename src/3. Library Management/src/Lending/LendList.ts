import BookLend from "./BookLend";
import BookItem from "../Catalog/Books/BookItem";
import Member from "../Users/Users/Member";

export default class LendList {
  private readonly lends: BookLend[] = [];

  public getActiveLend(item: BookItem): BookLend | null {
    return this.lends
      .filter(lend => lend.item.isLoaned && lend.item === item)
      .sort(
        (lendA, lendB) =>
          lendB.createdAt.getTime() - lendA.createdAt.getTime()
      )[0] || null;
  }

  public lend(item: BookItem, member: Member): BookLend {
    const lend = new BookLend(item, member);
    this.lends.push(lend);

    return lend;
  }
}
