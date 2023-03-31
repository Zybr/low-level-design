import Authorization from "./Authorizatoin/Authorization";
import PriceList from "./PriceList";
import Catalog from "./Catalog/Catalog";
import Service from "./Services/Service";
import Guest from "./Authorizatoin/Users/Guest";
import Booking from "./Booking";
import Room from "./Hotel/Room/Room";
import Hotel from "./Hotel/Hotel";

export default class System {
  private static instance: System;

  public static getInstance(): System {
    if (!System.instance) {
      System.instance = new System();
    }

    return System.instance;
  }

  private readonly authorization = new Authorization();
  private readonly priceList = new PriceList();
  private readonly catalog = new Catalog();
  private readonly bookings = new Map<Guest, Booking[]>()
  private readonly services = new Set<Service>()

  public getAuthorization(): Authorization {
    return this.authorization;
  }

  public getPriceList(): PriceList {
    return this.priceList;
  }

  public getHotels(): Hotel[] {
    return Array.from(
      new Set(
        this.catalog
          .search()
          .map(room => room.getHotel()))
    );
  }

  public getCatalog(): Catalog {
    return this.catalog;
  }

  public getServices(): Service[] {
    return Array.from(this.services.values());
  }

  public addService(service: Service, rate: number): void {
    this.services.add(service);
    this.priceList.setServiceTypeCost(service.constructor.name, rate);
  }

  public getCurrentBooking(guest: Guest): Booking | null {
    const bookings = this.bookings.get(guest) || [];

    if (!bookings.length) {
      return null;
    }

    const booking = bookings[bookings.length - 1];

    return booking.isActive() ? booking : null;
  }

  public book(guest: Guest, room: Room, startDate: Date, endDate: Date): Booking {
    const booking = new Booking(
      guest,
      room,
      startDate,
      endDate
    );

    this.bookings.set(guest, this.bookings.get(guest) || []);
    this.bookings.get(guest).push(booking);

    return booking;
  }
}
