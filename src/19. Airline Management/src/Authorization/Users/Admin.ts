import User from "./User";
import Aircraft from "../../Flight/Aircraft/Aircraft";
import Airline from "../../Airline";
import Flight from "../../Flight/Flight";
import FlightPrototype from "../../Flight/Prototype/FlightPrototype";
import Crew from "../../Flight/Crew";

export default class Admin extends User {
  public addAircraft(aircraft: Aircraft) {
    Airline.getInstance()
      .getPark()
      .addAircraft(aircraft)
  }

  public removeAircraft(aircraft: Aircraft) {
    Airline.getInstance()
      .getPark()
      .removeAircraft(aircraft)
  }

  public scheduleFlight(prototype: FlightPrototype, departureTime: Date) {
    const airline = Airline.getInstance();

    // TODO: Crew members have to be define accordingly their free time and positions which the aircraft requires
    const pilot = airline.getAuth().getPilots()[0];
    const steward = airline.getAuth().getStewards()[0];

    const crew = new Crew([pilot], [steward]);

    airline.getSchedule()
      .scheduleFlight(
        prototype.makeFlight(departureTime, crew),
      )
  }

  public cancelFlight(flight: Flight) {
    flight.cancel();
  }

  public blockUser(user: User) {
    user.block();
  }

  public unblockUser(user: User) {
    user.unblock();
  }
}
