import Location from "./Location";
import ParkingStall from "./ParkingStall";

export default class RentalBranch {
  private readonly stalls: ParkingStall[] = [];

  public constructor(
    private readonly location: Location,
  ) {
  }

  public addStall(stall: ParkingStall) {
    this.stalls.push(stall);
  }

  public getStall(licenseNumber: string): ParkingStall | null {
    return this.stalls
      .find(stall => stall.getVehicle()?.getLicenseNumber() === licenseNumber) || null;
  }

  public getFreeStalls(): ParkingStall[] {
    return this.stalls.filter(stall => stall.isFree());
  }
}
