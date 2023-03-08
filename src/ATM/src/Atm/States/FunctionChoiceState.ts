import AtmState from "./AtmState";
import Atm from "../Atm";
import Account from "../../Finance/Accounts/Account";
import CashWithdrawalState from "./CashWithdrawalState";
import BalanceEnquireState from "./BalanceEnquireState";
import TransferState from "./TransferState";
import IdleState from "./IdleState";
import ItemEnum from "../../Enums/ItemEnum";

export default class FunctionChoiceState implements AtmState {
  public constructor(
    private readonly atm: Atm,
    private readonly account: Account,
  ) {
    this.atm
      .getScreen()
      .setText(
        'Choose operation:'
        + '\n- 1. Enquire balance'
        + '\n- 2. Withdraw cash'
        + '\n- 3. Transfer money'
      )
  }

  public selectItem(item: ItemEnum) {
    switch (item) {
      case ItemEnum.FIRST:
        this.atm.setState(new BalanceEnquireState(
          this.atm,
          this.account
        ));
        break;
      case ItemEnum.SECOND:
        this.atm.setState(new CashWithdrawalState(
          this.atm,
          this.account
        ));
        break;
      case ItemEnum.THIRD:
        this.atm.setState(new TransferState(
          this.atm,
          this.account
        ));
        break;
    }
  }

  public typeNumber(number: number) {
  }

  public cancel() {
    this.atm.setState(new IdleState(this.atm));
  }
}
