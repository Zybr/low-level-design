import Account from "./Accounts/Account";
import SavingAccount from "./Accounts/SavingAccount";
import User from "../User";
import CurrentAccount from "./Accounts/CurrentAccount";

export default class Bank {
  private static currentId = 0;
  private readonly limit = 500;
  private readonly id: number;
  private readonly accounts = new Map<number, Account>()

  public constructor() {
    this.id = ++Bank.currentId;
  }

  public getId(): number {
    return this.id;
  }

  public hasAccount(accountId: number): boolean {
    return this.accounts.has(accountId);
  }

  public getAccount(accountId: number, pin: number = null): Account {
    if (!this.hasAccount(accountId)) {
      throw new Error(`There is not account with card ID = ${accountId}`);
    }

    const account = this.accounts.get(accountId);

    if (pin && !account.isValid(pin)) {
      throw new Error('Pin number is not valid');
    }

    return account;
  }

  public createSavingAccount(user: User): Account {
    const account = new SavingAccount(
      this,
      user,
      this.limit
    );

    if (this.accounts.has(account.getId())) {
      throw new Error(`Account with ID "${account.getId()}" already exists`);
    }

    this.accounts.set(account.getId(), account);

    return account;
  }

  public createCurrentAccount(user: User): Account {
    const account = new CurrentAccount(
      this,
      user,
      this.limit
    );

    if (this.accounts.has(account.getId())) {
      throw new Error(`Account with ID "${account.getId()}" already exists`);
    }

    this.accounts.set(account.getId(), account);

    return account;
  }
}
