import Address from "./Address";
import Storage from "./Meal/Storage/Storage";
import Menu from "./Meal/Menu/Menu";
import TablesList from "./Table/TablesList";
import Receptionist from "./Employees/Receptionist";
import Manager from "./Employees/Manager";
import Waiter from "./Employees/Waiter";
import ReservationList from "./Reservation/ReservationList";
import Employee from "./Employees/Employee";
import Chef from "./Employees/Chef";
import ReservationNotification from "./Notification/ReservationNotification";

export default class Branch {
  private readonly storage = new Storage();
  private readonly menu = new Menu();
  private readonly tables = new TablesList();
  private readonly reservations = new ReservationList(this.tables);
  private readonly managers = new Set<Manager>();
  private readonly receptionists = new Set<Receptionist>();
  private readonly chefs = new Set<Chef>();
  private readonly waiters = new Set<Waiter>();

  public constructor(
    private readonly address: Address,
  ) {
  }

  public getStorage(): Storage {
    return this.storage;
  }

  public getMenu(): Menu {
    return this.menu;
  }

  public getTables(): TablesList {
    return this.tables;
  }

  public getReservations(): ReservationList {
    return this.reservations;
  }

  public getManagers(): Manager[] {
    return Array.from(this.managers);
  }

  public addManager(manager: Manager): void {
    this.assertEmployee(manager);
    this.managers.add(manager);
  }

  public getReceptionists(): Receptionist[] {
    return Array.from(this.receptionists);
  }

  public addReceptionist(receptionist: Receptionist): void {
    this.assertEmployee(receptionist);
    this.receptionists.add(receptionist);
  }

  public getChefs(): Chef[] {
    return Array.from(this.chefs);
  }

  public addChef(chef: Chef): void {
    this.assertEmployee(chef);
    this.chefs.add(chef);
  }

  public getWaiters(): Waiter[] {
    return Array.from(this.waiters);
  }

  public addWaiter(waiter: Waiter): void {
    this.assertEmployee(waiter);
    this.waiters.add(waiter);
  }

  public informOfReservations(): void {
    this.reservations
      .getFeatureReservations()
      .filter(reservation => new Date().getTime() >= (reservation.getPeriod().getStart().getTime() - 1000 * 60 * 60))
      .forEach(reservation => new ReservationNotification(reservation.getPerson()));
  }

  private assertEmployee(employee: Employee): void {
    if (employee.getBranch() !== this) {
      throw new Error("Employee doesn't bellow current branch.");
    }
  }
}
