import AtmState from "./AtmState";
import Atm from "../Atm";
import ItemEnum from "../../Enums/ItemEnum";

export default class ErrorState implements AtmState {
  public constructor(
    private readonly atm: Atm,
    private readonly backwardState: AtmState,
    private readonly message: string
  ) {
    this.atm
      .getScreen()
      .setText(message);
  }

  public selectItem(item: ItemEnum) {
    this.cancel();
  }

  public typeNumber(number: number) {
  }

  public cancel() {
    this.atm.setState(this.backwardState);
  }
}
