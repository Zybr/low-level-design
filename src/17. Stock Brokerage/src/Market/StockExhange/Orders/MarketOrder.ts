import Order from "./Order";

export default class MarketOrder extends Order {
  public hasToBeProcessed(): boolean {
    return true;
  }
}
