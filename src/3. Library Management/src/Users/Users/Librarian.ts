import AbstractUser from "./AbstractUser";
import BookItem from "../../Catalog/Books/BookItem";
import Member from "./Member";
import Person from "../People/Person";
import BookReservation from "../../Reservation/BookReservation";
import Auth from "../Auth";
import ReservationList from "../../Reservation/ReservationList";
import Catalog from "../../Catalog/Catalog";
import Informer from "../../Notifications/Informer";
import BookLend from "../../Lending/BookLend";
import LendList from "../../Lending/LendList";
import Payment from "../../Lending/Payment";
import Config from "../../Config";
import Library from "../../Library";

export default class Librarian extends AbstractUser {
  public constructor(
    library: Library,
    person: Person,
    username: string,
    password: string,
  ) {
    super(
      library,
      person,
      username,
      password,
    );
  }

  public isAdmin(): boolean {
    return true;
  }

  public addItem(item: BookItem) {
    this
      .getCatalog()
      .addItem(item);
  }

  public blockMember(member: Member): Member {
    return this
      .getAuth()
      .deactivate(member);
  }

  public unblockMember(member: Member): Member {
    return this
      .getAuth()
      .activate(member);
  }

  public reserveBook(member: Member, item: BookItem): BookReservation {
    return this
      .getReservationList()
      .reserve(item, member);
  }

  public cancelReservation(member: Member, item: BookItem): BookReservation | null {
    const reservation = this
      .getReservationList()
      .unreserve(item, member);

    this.informNextReservedMember(item);

    return reservation;
  }

  public lendBook(member: Member, item: BookItem): BookLend | null {
    if (this.hasMaxLendNum(member)) {
      return null;
    }

    if (!item.isFree) {
      return null;
    }

    return this
      .getLendList()
      .lend(item, member);
  }

  public renewBook(member: Member, item: BookItem): BookLend {
    return this
      .getLendList()
      .getActiveLend(item)
      .renew();
  }

  public returnBook(item: BookItem): BookLend {
    const lend = this
      .getLendList()
      .getActiveLend(item)
      .done();

    this.informNextReservedMember(item);
    const days = lend.overdueDays;

    if (days > 0) { // Attache fine to the lend if it's overdue
      lend.payment = new Payment(
        days,
        Config.FINE_RATE * days
      )
    }

    return lend;
  }

  public getFineAmount(item: BookItem): number {
    return this
      .getLendList()
      .getActiveLend(item)
      .overdueDays * Config.FINE_RATE;
  }

  private getAuth(): Auth {
    return this.library.getAuth(this);
  }

  private getReservationList(): ReservationList {
    return this.library.getReservationList(this);
  }

  private getLendList(): LendList {
    return this.library.getLendList(this);
  }

  private getCatalog(): Catalog {
    return this.library.getCatalog(this);
  }

  private getInformer(): Informer {
    return this.library.getInformer(this);
  }

  private informNextReservedMember(item) {
    const nextWaiting = this
      .getReservationList()
      .getWaitingReservations(item)[0];

    if (nextWaiting) {
      this
        .getInformer()
        .notifyOfAvailableBook(nextWaiting.member, nextWaiting.item)
    }
  }

  private hasMaxLendNum(member: Member) {
    return member.getLendBookNum() === Config.MAX_LEND_NUM;
  }
}
