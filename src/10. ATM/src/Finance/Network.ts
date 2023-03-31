import Bank from "./Bank";
import Account from "./Accounts/Account";

export default class Network {
  private readonly banks = new Map<number, Bank>();

  public createBank(): Bank {
    const bank = new Bank();

    if (this.banks.has(bank.getId())) {
      throw new Error(`Bank with ID ${bank.getId()} already exists`);
    }

    this.banks.set(bank.getId(), bank);

    return bank;
  }

  public getBank(bankId: number): Bank {
    if (!this.banks.has(bankId)) {
      throw new Error(`There is not bank with ID ${bankId}`)
    }

    return this.banks.get(bankId);
  }

  public getAccount(accountId: number): Account {
    for (const bank of Array.from(this.banks.values())) {
      if (bank.hasAccount(accountId)) {
        return bank.getAccount(accountId);
      }
    }

    throw new Error(`Account with ID "${accountId}" is not defined.`);
  }

  public transfer(from: Account, to: Account, amount: number) {
    if (from.getId() === to.getId()) {
      throw new Error('Source and destination accounts are the same');
    }

    from.subMoney(amount);
    to.addMoney(amount);
  }
}
