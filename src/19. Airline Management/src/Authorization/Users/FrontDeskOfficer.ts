import User from "./User";
import Itinerary from "../../Itinerary/Itinerary";
import Customer from "./Customer/Customer";
import Airline from "../../Airline";

export default class FrontDeskOfficer extends User {
  public makeItinerary(customer: Customer): Itinerary {
    return Airline.getInstance()
      .getItinerariesCatalog()
      .createItinerary(customer);
  }

  public confirmItinerary(customer: Customer, itinerary: Itinerary) {
    if (customer !== itinerary.getCustomer()) {
      throw new Error("Itinerary doesn't belong to the customer");
    }

    itinerary.confirm()
  }
}
