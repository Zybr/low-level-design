import AtmState from "./AtmState";
import Atm from "../Atm";
import Account from "../../Finance/Accounts/Account";
import FunctionChoiceState from "./FunctionChoiceState";
import ErrorState from "./ErrorState";
import TransferReceipt from "../Receipts/TransferReceipt";
import ItemEnum from "../../Enums/ItemEnum";

export default class TransferState implements AtmState {
  private dstCardId: number;
  private amount: number;
  private isDone = false;

  public constructor(
    private readonly atm: Atm,
    private readonly account: Account,
  ) {
    this.atm.getScreen()
      .setText('Enter target card number and amount')
  }

  public selectItem(item: ItemEnum) {
    if (!this.isDone && item === ItemEnum.FIRST) {
      this.atm.dispenseReceipt(new TransferReceipt(
        this.amount,
        this.dstCardId
      ));

      this.cancel();
    }
  }

  public typeNumber(number: number) {
    if (this.isDone) {
      return;
    }

    if (!this.dstCardId) {
      this.dstCardId = number;
      return;
    }

    this.amount = number;

    try {
      const finance = this.atm.getNetwork();
      finance.transfer(
        this.account,
        finance.getAccount(this.dstCardId),
        this.amount
      );
      this.atm.getScreen()
        .setText(
          'Choose operations:'
          + '\n - 1. Print receipt'
        );
    } catch (error) {
      this.atm.setState(new ErrorState(
        this.atm,
        new TransferState(this.atm, this.account),
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
