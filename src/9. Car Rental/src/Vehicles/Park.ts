import AbstractVehicle from "./AbstractVehicle";
import Van from "./Van";
import Motorcycle from "./Motorcycle";
import Car from "./Car";
import Truck from "./Truck";

export default class Park {
  private readonly vehiclesByNumber = new Map<string, AbstractVehicle<any>>();
  private readonly vehiclesByClass = new Map<string, Set<AbstractVehicle<any>>>([
    [Van.name, new Set<Van>()],
    [Motorcycle.name, new Set<Motorcycle>()],
    [Car.name, new Set<Car>()],
    [Truck.name, new Set<Truck>()],
  ]);

  public addVehicle(vehicle: AbstractVehicle<any>) {
    this.vehiclesByNumber.set(vehicle.getLicenseNumber(), vehicle);
    this.vehiclesByClass.get(vehicle.constructor.name).add(vehicle);
  }

  public getVehicles(): AbstractVehicle<any>[] {
    return Array.from(this.vehiclesByNumber.values()).filter(vehicle => vehicle.isFree());
  }

  public getVehicle(licenseNumber: string): AbstractVehicle<any> | null {
    return this.vehiclesByNumber.get(licenseNumber) || null;
  }

  public findVans(model: string = null): Van[] {
    return this.find(Van.name, model);
  }

  public findMotorcycles(model: string = null): Motorcycle[] {
    return this.find(Motorcycle.name, model);
  }

  public findCars(model: string = null): Car[] {
    return this.find(Car.name, model);
  }

  public findTrucks(model: string = null): Truck[] {
    return this.find(Truck.name, model);
  }

  public find(className: string, model: string = null): AbstractVehicle<any>[] {
    const vehicles = Array.from(this.vehiclesByClass.get(className));

    return model
      ? vehicles.filter(vehicle => vehicle.getModel() === model)
      : vehicles;
  }
}
