import Product from "../Product";

export default interface StateInterface {
  insertMoney(money: number): void

  chooseRack(rackId: number): void

  getProduct(): Product | null

  getChange(): number
}
