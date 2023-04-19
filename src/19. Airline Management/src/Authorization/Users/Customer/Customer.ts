import User from "../User";
import Wallet from "./Wallet";
import Itinerary from "../../../Itinerary/Itinerary";
import Airline from "../../../Airline";

export default class Customer extends User {
  private readonly wallet = new Wallet()

  public getWallet(): Wallet {
    return this.wallet;
  }

  public makeItinerary(): Itinerary {
    return Airline.getInstance()
      .getItinerariesCatalog()
      .createItinerary(this);
  }

  public confirmItinerary(itinerary: Itinerary) {
    this.assertMyItinerary(itinerary);
    itinerary.confirm()
  }

  private assertMyItinerary(itinerary: Itinerary) {
    if (itinerary.getCustomer() !== this) {
      throw new Error("Itinerary doesn't belong to the customer");
    }
  }
}
