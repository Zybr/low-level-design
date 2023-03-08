import AtmState from "./AtmState";
import Atm from "../Atm";
import Account from "../../Finance/Accounts/Account";
import FunctionChoiceState from "./FunctionChoiceState";
import ErrorState from "./ErrorState";
import ItemEnum from "../../Enums/ItemEnum";
import WithdrawalReceipt from "../Receipts/WithdrawalReceipt";

export default class CashWithdrawalState implements AtmState {
  private amount: number;

  public constructor(
    private readonly atm: Atm,
    private readonly account: Account,
  ) {
    this.atm.getScreen()
      .setText('Enter amount of money')
  }

  public selectItem(item: ItemEnum) {
    if (this.amount && item === ItemEnum.FIRST) {
      this.atm.dispenseReceipt(new WithdrawalReceipt(
        this.amount,
      ));

      this.cancel();
    }
  }

  public typeNumber(number: number) {
    if (this.amount) {
      return;
    }

    this.amount = number;

    try {
      this.atm.dispenseCash(
        this.account
          .subMoney(this.amount)
      );
      this.atm.getScreen()
        .setText(
          'Choose operations:'
          + '\n- 1. Print receipt'
        )
    } catch (error) {
      this.atm.setState(new ErrorState(
        this.atm,
        new CashWithdrawalState(this.atm, this.account),
        error.message
      ))
    }
  }

  public cancel() {
    this.atm.setState(new FunctionChoiceState(
      this.atm,
      this.account
    ));
  }
}
