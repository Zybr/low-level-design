import AtmState from "./AtmState";
import Card from "../../Finance/Card";
import Atm from "../Atm";
import ErrorState from "./ErrorState";
import FunctionChoiceState from "./FunctionChoiceState";
import Account from "../../Finance/Accounts/Account";
import IdleState from "./IdleState";
import ItemEnum from "../../Enums/ItemEnum";

export default class AuthorizationState implements AtmState {
  public constructor(
    private readonly atm: Atm,
    private readonly card: Card,
  ) {
    this.atm.getScreen().setText('Enter pin code');
  }

  public selectItem(item: ItemEnum) {
  }

  public typeNumber(pin: number) {
    let account: Account;

    try {
      account = this.atm
        .getNetwork()
        .getBank(this.card.getBankId())
        .getAccount(this.card.getAccountId(), pin);
    } catch (error) {
      this.atm.setState(new ErrorState(
        this.atm,
        this,
        error.message
      ));

      return;
    }

    this.atm.setState(new FunctionChoiceState(
      this.atm,
      account
    ));
  }

  public cancel() {
    this.atm.setState(new IdleState(this.atm));
  }
}
