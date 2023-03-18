import Service from "./Service";
import System from "../System";

export default class RoomService extends Service {
  public getRate(): number {
    return System.getInstance()
      .getPriceList()
      .getServiceTypeCost(RoomService.name);
  }
}
