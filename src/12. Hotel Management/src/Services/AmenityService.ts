import Service from "./Service";
import System from "../System";

export default class AmenityService extends Service {
  public getRate(): number {
    return System.getInstance()
      .getPriceList()
      .getServiceTypeCost(AmenityService.name);
  }
}
