import RentalBranch from "./RentalBranch";
import AbstractService from "./Services/AbstractService";
import AbstractEquipment from "./Equipments/AbstractEquipment";
import Park from "./Vehicles/Park";
import Authorization from "./Users/Authorization";

export default class RentalSystem {
  private static instance: RentalSystem | null;

  private readonly auth = new Authorization();
  private readonly branches = new Set<RentalBranch>();
  private readonly park = new Park();
  private readonly services = new Set<AbstractService>();
  private readonly equipments = new Set<AbstractEquipment>();

  private constructor() {
  }

  public static getInstance(): RentalSystem {
    this.instance = this.instance || new RentalSystem();

    return this.instance;
  }

  public getAuth(): Authorization {
    return this.auth;
  }

  public getFineRate(): number {
    return 2;
  }

  public getBranches(): RentalBranch[] {
    return Array.from(this.branches);
  }

  public addBranch(branch: RentalBranch) {
    this.branches.add(branch);
  }

  public getPark(): Park {
    return this.park;
  }

  public addService(service: AbstractService) {
    this.services.add(service);
  }

  public getServices(): AbstractService[] {
    return Array.from(this.services);
  }

  public addEquipment(equipment: AbstractEquipment) {
    this.equipments.add(equipment);
  }

  public getEquipments(): AbstractEquipment[] {
    return Array.from(this.equipments);
  }
}
