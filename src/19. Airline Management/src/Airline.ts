import Authorization from "./Authorization/Authorization";
import Park from "./Flight/Aircraft/Park";
import FlightPrototypesCatalog from "./Flight/Prototype/FlightPrototypesCatalog";
import Schedule from "./Schedule/Schedule";
import ItinerariesCatalog from "./Itinerary/ItinerariesCatalog";

export default class Airline {
  private static instance: Airline | null;

  private readonly auth = new Authorization();
  private readonly park = new Park();
  private readonly protoCatalog = new FlightPrototypesCatalog();
  private readonly schedule = new Schedule();
  private readonly itinerariesCatalog = new ItinerariesCatalog();

  public static getInstance(): Airline {
    if (!Airline.instance) {
      Airline.instance = new Airline();
    }

    return Airline.instance;
  }

  private constructor() {
  }

  public getAuth(): Authorization {
    return this.auth;
  }

  public getPark(): Park {
    return this.park;
  }

  public getProtoCatalog(): FlightPrototypesCatalog {
    return this.protoCatalog;
  }

  public getSchedule(): Schedule {
    return this.schedule;
  }

  public getItinerariesCatalog(): ItinerariesCatalog {
    return this.itinerariesCatalog;
  }
}
