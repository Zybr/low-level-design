import Network from "../Finance/Network";
import Screen from "./Screen";
import AtmState from "./States/AtmState";
import IdleState from "./States/IdleState";
import Card from "../Finance/Card";
import Receipt from "./Receipts/Receipt";
import AuthorizationState from "./States/AuthorizationState";

export default class Atm {
  private readonly screen = new Screen();
  private state: AtmState = new IdleState(this);
  private cash = 0;

  private returnCard: Card | null = null;
  private returnCash = 0;
  private returnReceipts: Receipt[] = []

  public constructor(
    private readonly network: Network,
    private readonly limit: number,
  ) {
  }

  // Using by operator

  public addCash(amount: number) {
    this.cash += amount;
  }

  // Using by states

  public setState(state: AtmState) {
    this.state = state;
  }

  public getNetwork(): Network {
    return this.network;
  }

  public getScreen(): Screen {
    return this.screen;
  }

  public getLimit(): number {
    return this.limit;
  }

  public dispenseReceipt(receipt: Receipt) {
    this.returnReceipts.push(receipt);
  }

  public dispenseCash(amount: number) {
    if (amount > this.cash) {
      throw new Error('There is no enough cash');
    }

    if (amount > this.limit) {
      throw new Error('Amount over the ATM limit');
    }

    this.cash -= amount;
    this.returnCash += amount;
  }

  // Using by user

  public getCash(): number {
    return this.cash;
  }

  public insertCard(card: Card): this {
    if (this.returnCard) {
      throw new Error('Card is already inserted');
    }

    this.returnCard = card;
    this.setState(new AuthorizationState(this, card));

    return this;
  }

  public selectItem(item: number): this {
    this.state.selectItem(item);

    return this;
  }

  public typeNumber(number: number): this {
    this.state.typeNumber(number);

    return this;
  }

  public cancel(): this {
    this.state.cancel();

    return this;
  }

  public collectCard(): Card | null {
    if (this.state instanceof IdleState) {
      const card = this.returnCard;
      this.returnCard = null;
      return card;
    }

    return null;
  }

  public collectCash(): number {
    const cash = this.returnCash;
    this.returnCash = 0;

    return cash;
  }

  public collectReceipt(): Receipt[] {
    const receipts = this.returnReceipts;
    this.returnReceipts = [];

    return receipts;
  }
}
