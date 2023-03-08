import AtmState from "./AtmState";
import Atm from "../Atm";
import ItemEnum from "../../Enums/ItemEnum";

export default class IdleState implements AtmState {
  public constructor(
    private readonly atm: Atm,
  ) {
    this.atm.getScreen().setText('Insert a card to continue')
  }

  public selectItem(item: ItemEnum) {
  }

  public typeNumber(number: number) {
  }

  public cancel() {
  }
}
