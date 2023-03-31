import Card from "./Finance/Card";
import Atm from "./Atm/Atm";
import BalanceReceipt from "./Atm/Receipts/BalanceReceipt";
import WithdrawalReceipt from "./Atm/Receipts/WithdrawalReceipt";
import ItemEnum from "./Enums/ItemEnum";
import History from "./History";

export default class User {
  private cash = 0;
  private card: Card;
  private pin: number;
  private readonly history = new History();

  public constructor(
    private readonly fullName: string,
  ) {
  }

  public setCard(card: Card) {
    this.card = card;
  }

  public getCard(): Card {
    return this.card;
  }

  public setPin(pin: number) {
    this.pin = pin;
  }

  public getCash(): number {
    return this.cash;
  }

  public addCash(amount: number) {
    this.cash += amount;
  }

  public getHistory(): History {
    return this.history;
  }

  public getBalance(atm: Atm): BalanceReceipt {
    this.history.clear();
    this.history.addAtmText(atm);
    atm.insertCard(this.card);
    this.history.addAtmText(atm);
    atm.typeNumber(this.pin)
    this.history.addAtmText(atm);
    atm.selectItem(ItemEnum.FIRST) // Balance
    this.history.addAtmText(atm);
    atm.selectItem(ItemEnum.FIRST) // Print receipt
    this.history.addAtmText(atm);
    const receipt = atm.collectReceipt().pop()
    this.returnCard(
      atm.cancel()
        .collectCard()
    );
    this.history.addAtmText(atm);

    return receipt;
  }

  public withdrawCash(atm: Atm, amount: number): WithdrawalReceipt {
    this.history.clear();
    this.history.addAtmText(atm);
    atm.insertCard(this.card)
    this.history.addAtmText(atm);
    atm.typeNumber(this.pin)
    this.history.addAtmText(atm);
    atm.selectItem(ItemEnum.SECOND) // Withdraw
    this.history.addAtmText(atm);
    atm.typeNumber(amount) // Enter mount
    this.addCash(atm.collectCash())
    this.history.addAtmText(atm);
    atm.selectItem(ItemEnum.FIRST) // Print receipt
    const receipt = atm.collectReceipt().pop();
    this.returnCard(
      atm
        .cancel()
        .collectCard()
    );
    this.history.addAtmText(atm);

    return receipt;
  }

  public transferMoney(atm: Atm, cardId: number, amount: number) {
    this.history.clear();
    this.history.addAtmText(atm);
    atm.insertCard(this.card)
    this.history.addAtmText(atm);
    atm.typeNumber(this.pin)
    this.history.addAtmText(atm);
    atm.selectItem(ItemEnum.THIRD) // Transfer
    this.history.addAtmText(atm);
    atm.typeNumber(cardId) // Enter card ID
    atm.typeNumber(amount) // Enter amount
    this.history.addAtmText(atm);
    atm.selectItem(ItemEnum.FIRST) // Print receipt
    this.history.addAtmText(atm);
    const receipt = atm.collectReceipt().pop();
    this.returnCard(
      atm
        .cancel()
        .collectCard()
    );
    this.history.addAtmText(atm);

    return receipt;
  }

  private returnCard(card: Card) {
    this.card = card;
  }
}
