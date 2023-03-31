import Employee from "./Employee";
import Period from "../Reservation/Period";
import Table from "../Table/Table";
import Person from "../Person/Person";

export default class Receptionist extends Employee {
  public getFreeTables(period: Period): Table[] {
    return this.getBranch()
      .getReservations()
      .getFreeTables(period);
  }

  public getActiveTable(person: Person): Table | null {
    return this.getBranch()
      .getReservations()
      .getPersonActiveReservation(person)
      ?.getTable();
  }

  public reserve(person: Person, period: Period, table?: Table): void {
    this.getBranch()
      .getReservations()
      .reserve(person, period, table);
  }
}
