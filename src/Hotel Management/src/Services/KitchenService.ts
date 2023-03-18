import Service from "./Service";
import System from "../System";

export default class KitchenService extends Service {
  public getRate(): number {
    return System.getInstance()
      .getPriceList()
      .getServiceTypeCost(KitchenService.name);
  }
}
