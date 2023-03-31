import AtmState from "./AtmState";
import Atm from "../Atm";
import Account from "../../Finance/Accounts/Account";
import FunctionChoiceState from "./FunctionChoiceState";
import BalanceReceipt from "../Receipts/BalanceReceipt";
import ItemEnum from "../../Enums/ItemEnum";

export default class BalanceEnquireState implements AtmState {
  public constructor(
    private readonly atm: Atm,
    private readonly account: Account,
  ) {
    this.atm.getScreen().setText(
      `Balance: ${account.getMoney()}.`
      + '\nChoose operation:'
      + '\n- 1. Print receipt'
    );
  }

  public selectItem(item: ItemEnum) {
    if (item === ItemEnum.FIRST) {
      this.atm.dispenseReceipt(new BalanceReceipt(this.account.getMoney()));
      this.cancel();
    }
  }

  public typeNumber(number: number) {
  }

  public cancel() {
    this.atm.setState(new FunctionChoiceState(
      this.atm,
      this.account
    ));
  }
}
