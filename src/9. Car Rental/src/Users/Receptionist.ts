import AbstractUser from "./AbstractUser";
import AbstractVehicle from "../Vehicles/AbstractVehicle";
import RentalSystem from "../RentalSystem";
import ActionType from "../Vehicles/History/ActionType";
import RentalBranch from "../RentalBranch";
import Park from "../Vehicles/Park";

export default class Receptionist extends AbstractUser {
  public addVehicle(vehicle: AbstractVehicle<any>) {
    Receptionist.park.addVehicle(vehicle);
  }

  public getVehicle(licenseNumber: string): AbstractVehicle<any> | null {
    return Receptionist.park
      .getVehicle(licenseNumber);
  }

  public addLog(licenseNumber: string, type: ActionType) {
    Receptionist.park
      .getVehicle(licenseNumber)
      ?.getHistory()
      .log(type);
  }

  private static get park(): Park {
    return RentalSystem
      .getInstance()
      .getPark();
  }
}
