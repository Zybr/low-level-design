import Catalog from "./Catalog/Catalog";
import Auth from "./Users/Auth";
import Informer from "./Notifications/Informer";
import AbstractUser from "./Users/Users/AbstractUser";
import Librarian from "./Users/Users/Librarian";
import ReservationList from "./Reservation/ReservationList";
import LendList from "./Lending/LendList";
import Person from "./Users/People/Person";
import Member from "./Users/Users/Member";

export default class Library {
  private readonly catalog = new Catalog();
  private readonly auth = new Auth(this);
  private readonly informer = new Informer();
  private readonly reservationsList = new ReservationList();
  private readonly lendList = new LendList();

  /** Auth */

  public register(person: Person, username: string, password: string): Member {
    return this.auth.registerMember(person, username, password).member as Member;
  }

  public login(username: string, password: string): AbstractUser {
    return this.auth.login(username, password);
  }

  public logout(user: AbstractUser) {
    return this.auth.logout(user);
  }

  /** Services */

  public getAuth(user: AbstractUser): Auth {
    this.checkAdmin(user);

    return this.auth;
  }

  public getCatalog(user: AbstractUser): Catalog {
    this.checkLogged(user);

    return this.catalog;
  }

  public getReservationList(user: AbstractUser): ReservationList {
    this.checkAdmin(user);

    return this.reservationsList;
  }

  public getLendList(user: AbstractUser): LendList {
    this.checkAdmin(user);

    return this.lendList;
  }

  public getInformer(user: AbstractUser): Informer {
    this.checkAdmin(user);

    return this.informer;
  }

  /** Librarian */

  public getLibrarian(user: AbstractUser): Librarian {
    this.checkLogged(user);

    return this.auth.getAdmins()[0] as Librarian;
  }

  /** */

  private checkLogged(user: AbstractUser): void {
    if (!this.auth.isLoggedIn(user)) {
      throw new Error('Access denied');
    }
  }

  private checkAdmin(user: AbstractUser): void {
    this.checkLogged(user);

    if (!user.isAdmin()) {
      throw new Error('Access denied');
    }
  }
}
