import Service from "./Service";
import System from "../System";

export default class FoodServices extends Service {
  public getRate(): number {
    return System.getInstance()
      .getPriceList()
      .getServiceTypeCost(FoodServices.name);
  }
}
