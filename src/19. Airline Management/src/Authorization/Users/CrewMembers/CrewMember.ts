import User from "../User";
import Flight from "../../../Flight/Flight";
import Airline from "../../../Airline";

export default abstract class CrewMember extends User {
  public getAssignedFlights(): Flight[] {
    return Airline.getInstance()
      .getSchedule()
      .getMemberFlights(this);
  }
}
