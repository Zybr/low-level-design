import Network from "../src/Finance/Network";
import User from "../src/User";
import { faker } from "@faker-js/faker";
import Atm from "../src/Atm/Atm";
import BalanceReceipt from "../src/Atm/Receipts/BalanceReceipt";
import WithdrawalReceipt from "../src/Atm/Receipts/WithdrawalReceipt";
import TransferReceipt from "../src/Atm/Receipts/TransferReceipt";

const makeUser = (finance: Network): User => {
  const user = new User(faker.name.fullName());
  const bank = finance.createBank();
  const account = bank.createCurrentAccount(user);
  account.addMoney(1000);

  return user;
}
const makeAtm = (finance: Network): Atm => {
  const atm = new Atm(finance, 300);
  atm.addCash(10000);
  return atm;
}

const assertLogs = (actualLogs: string[], expectedLogs: string[]) => {
  expect(actualLogs).toHaveLength(expectedLogs.length);
  for (let i = 0; i < actualLogs.length; i++) {
    expect(actualLogs[i]).toContain(expectedLogs[i]);
  }
}

describe('User', () => {
  let finance: Network;
  let userA: User;
  let userB: User;
  let atm: Atm;

  beforeEach(() => {
    finance = new Network();
    atm = makeAtm(finance);
    userA = makeUser(finance);
    userB = makeUser(finance);
  });

  test('Get balance', () => {
    const receipt = userA.getBalance(atm);

    expect(receipt).toBeInstanceOf(BalanceReceipt);
    expect(receipt.getAmount()).toEqual(1000);

    assertLogs(
      userA.getHistory().getLogs(),
      [
        'Insert a card',
        'Enter pin',
        '1. Enquire balance',
        'Balance: 1000',
        'Choose operation',
        'Insert a card',
      ]
    );
  });

  test('Get cash', () => {
    const receipt = userA.withdrawCash(atm, 200);
    const logs = userA.getHistory().getLogs();

    expect(receipt).toBeInstanceOf(WithdrawalReceipt);
    expect(receipt.getAmount()).toEqual(200);

    expect(userA.getBalance(atm).getAmount()).toEqual(800);
    expect(userA.getCash()).toEqual(200);

    assertLogs(
      logs,
      [
        'Insert a card',
        'Enter pin',
        '2. Withdraw cash',
        'Enter amount',
        '1. Print receipt',
        'Insert a card',
      ]
    );
  });

  test('Transfer money', () => {
    const receiverId = userB.getCard().getAccountId();
    const receipt: TransferReceipt = userA.transferMoney(atm, receiverId, 200) as TransferReceipt;
    const logs = userA.getHistory().getLogs();

    expect(receipt).toBeInstanceOf(TransferReceipt);
    expect(receipt.getAmount()).toEqual(200);
    expect(receipt.getReceiverNumber()).toEqual(receiverId);

    expect(userA.getBalance(atm).getAmount()).toEqual(800);
    expect(userB.getBalance(atm).getAmount()).toEqual(1200);

    assertLogs(
      logs,
      [
        'Insert a card',
        'Enter pin',
        '3. Transfer money',
        'Enter target card',
        '1. Print receipt',
        'Choose operation',
        'Insert a card',
      ]
    );
  });
});
