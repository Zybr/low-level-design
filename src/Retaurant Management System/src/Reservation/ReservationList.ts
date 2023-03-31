import Reservation from "./Reservation";
import Person from "../Person/Person";
import Table from "../Table/Table";
import Period from "./Period";
import TablesList from "../Table/TablesList";

export default class ReservationList {
  private readonly reservations = new Set<Reservation>();

  public constructor(
    private readonly tables: TablesList
  ) {
  }

  public getReservations(): Reservation[] {
    return Array.from(this.reservations);
  }

  public getFeatureReservations(): Reservation[] {
    return this.getReservations()
      .filter(reservation => !reservation.isCanceled() && !reservation.isDone());
  }

  public getPersonActiveReservation(person: Person): Reservation | null {
    return this.getReservations()
      .find(reservation => reservation.isActive() && reservation.getPerson() === person) || null;
  }

  public getTableActiveReservation(table: Table): Reservation | null {
    return this.getReservations()
      .find(reservation => reservation.isActive && reservation.getTable() === table);
  }

  public getFreeTables(period: Period): Table[] {
    const reserved = new Set(
      this.getFeatureReservations()
        .filter(reservation => reservation.getPeriod().intersect(period))
        .map(reservation => reservation.getTable())
    );

    return this.tables
      .getTables()
      .filter(table => !reserved.has(table));
  }

  public reserve(
    person: Person,
    period: Period,
    table?: Table,
  ): void {
    this.reservations.add(new Reservation(
      person,
      table || this.getFreeTables(period)[0],
      period
    ));
  }
}
