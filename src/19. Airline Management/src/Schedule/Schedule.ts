import Flight from "../Flight/Flight";
import CrewMember from "../Authorization/Users/CrewMembers/CrewMember";
import SearchFilter from "./SearchFilter";

export default class Schedule {
  public flights = new Set<Flight>();
  public memberFlights = new Map<CrewMember, Set<Flight>>()

  public scheduleFlight(flight: Flight) {
    this.flights.add(flight);
    [
      ...flight.getCrew().getStewards(),
      ...flight.getCrew().getPilots(),
    ].forEach(member => {
      this.memberFlights.set(
        member,
        this.memberFlights.get(member) || new Set<Flight>
      );

      this.memberFlights
        .get(member)
        .add(flight);
    })
  }

  public getFlights(): Flight[] {
    return Array.from(this.flights.values())
      .filter(flight => flight.isPending());
  }

  public searchFlights(filter: SearchFilter): Flight[] {
    return this.getFlights()
      .filter(flight => {
        if (filter.getArrivalAirport() && flight.getArrival().getAirport() !== filter.getArrivalAirport()) {
          return false;
        }

        if (filter.getDepartureAirport() && flight.getDeparture().getAirport() !== filter.getDepartureAirport()) {
          return false;
        }

        return !(filter.getDepartureDate() && filter.getDepartureDate().toDateString() !== flight.getDeparture().getTime().toDateString());
      });
  }

  public getMemberFlights(member: CrewMember): Flight[] {
    return Array.from(this.memberFlights.get(member) || []);
  }
}
