import Customer from "../Authorization/Users/Customer/Customer";
import Itinerary from "./Itinerary";
import Flight from "../Flight/Flight";
import Seat from "../Flight/Aircraft/Seat";
import Reservation from "./Reservation/Reservation";

export default class ItinerariesCatalog {
  private readonly customerItineraries = new Map<Customer, Set<Itinerary>>();

  public createItinerary(customer: Customer): Itinerary {
    const itinerary = new Itinerary(customer);
    this.customerItineraries.set(
      customer,
      this.customerItineraries.get(customer) || new Set<Itinerary>()
    )
    this.customerItineraries
      .get(customer).add(itinerary);

    return itinerary;
  }

  public getCustomerItineraries(customer: Customer): Itinerary[] {
    return Array.from(this.customerItineraries.get(customer) || []);
  }

  public getFreeSeats(flight: Flight): Seat[] {
    const reservedSeats = new Set(this.getReservedSeats(flight));

    return flight
      .getAircraft()
      .getSeats()
      .filter(seat => !reservedSeats.has(seat));
  }

  public getFlightReservations(flight: Flight): Reservation[] {
    return this.getConfirmedReservations(flight);
  }

  private getReservedSeats(flight: Flight): Seat[] {
    const seats: Seat[] = [];

    this.getConfirmedReservations(flight)
      .forEach(rsv => seats.push(...rsv.getSeats()));

    return seats;
  }

  private getConfirmedReservations(flight: Flight): Reservation[] {
    const itineraries: Itinerary[] = [];
    const confirmedReservations: Reservation[] = [];

    Array.from(this.customerItineraries.values())
      .forEach(
        itinerariesSet => itineraries.push(
          ...Array.from(itinerariesSet.values())
            .filter(itinerary => itinerary.hasFlight(flight))
        )
      );

    itineraries.forEach(
      itr => itr.getReservations()
        .filter(rsv => rsv.isConfirmed() && rsv.getFlight() === flight)
        .forEach(rsv => confirmedReservations.push(rsv))
    );

    return confirmedReservations;
  }
}
