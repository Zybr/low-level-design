import System from "../src/System";
import { faker } from "@faker-js/faker";
import Member from "../src/Auth/Users/Member/Member";
import { OrderType } from "../src/Market/StockExhange/Orders/Enums/OrderType";
import MarketOrder from "../src/Market/StockExhange/Orders/MarketOrder";
import StockItem from "../src/Market/Inventory/StockItem";
import DepositChangedNotification from "../src/Notifications/DepositChangedNotification";
import OrderCompleteNotification from "../src/Notifications/OrderCompleteNotification";

const system = System.getInstance();
const auth = system.getAuth();
const inventory = system.getInventory();
const depositSize = 1000;
const randomInt = (max: number, min: number = 0): number => Math.floor(min + Math.random() * (max - min));

const shares = [
  {
    name: faker.word.noun(),
    price: randomInt(10),
  },
  {
    name: faker.word.noun(),
    price: randomInt(10),
  },
  {
    name: faker.word.noun(),
    price: randomInt(10),
  },
]

const makeMember = (username: string = null) => {
  username = username || faker.internet.userName();
  const password = faker.internet.password();

  auth.registerMember(username, password)
  const member = auth.login(username, password) as Member;
  member.getDeposit().addMoney(depositSize);

  return member;
}

const makeStocks = () => {
  shares.forEach(
    share => inventory.createStocks(
      share.name,
      share.price,
    )
  );
}

describe('System', () => {
  let member0: Member;
  let memberA: Member;
  let memberB: Member;
  let memberC: Member;

  beforeAll(
    () => {
      makeStocks();
      member0 = makeMember(`member0 - ${faker.datatype.number()}`);
      memberA = makeMember(`memberA - ${faker.datatype.number()}`);
      memberB = makeMember(`memberB - ${faker.datatype.number()}`);
      memberC = makeMember(`memberC - ${faker.datatype.number()}`);
    },
  );

  test('place order', () => {
    member0.placeOrder(
      inventory.getStock(shares[1].name),
      randomInt(10),
      OrderType.Buy
    )
      .marketOrder();

    expect(member0.getOrders()).toHaveLength(1);
    expect(member0.getOrders()[0]).toBeInstanceOf(MarketOrder)
  });

  test('buy market stock', () => {
    const stock = inventory.getStock(shares[0].name);
    const price = stock.getPrice();

    memberB.getPortfolio().addItem(new StockItem(stock, 10))
    memberC.getPortfolio().addItem(new StockItem(stock, 10))

    memberA.placeOrder(stock, 8, OrderType.Buy).marketOrder();
    memberB.placeOrder(stock, 5, OrderType.Sell).marketOrder();
    memberC.placeOrder(stock, 5, OrderType.Sell).marketOrder();

    expect(memberA.getDeposit().getAmount()).toEqual(depositSize - (5 + 3) * price);
    expect(memberA.getPortfolio().getItem(stock).getQuantity()).toEqual(5 + 3);
    expect(memberA.getNotifications()).toHaveLength(4);
    expect(memberA.getNotifications()[0]).toBeInstanceOf(DepositChangedNotification); // + 1000
    expect(memberA.getNotifications()[1]).toBeInstanceOf(DepositChangedNotification); // - 5 shares
    expect(memberA.getNotifications()[2]).toBeInstanceOf(DepositChangedNotification); // - 3 shares
    expect(memberA.getNotifications()[3]).toBeInstanceOf(OrderCompleteNotification); // Done

    expect(memberB.getDeposit().getAmount()).toEqual(depositSize + 5 * price);
    expect(memberB.getPortfolio().getItem(stock).getQuantity()).toEqual(10 - 5);
    expect(memberB.getNotifications()).toHaveLength(3);
    expect(memberB.getNotifications()[0]).toBeInstanceOf(DepositChangedNotification); // + 1000
    expect(memberB.getNotifications()[1]).toBeInstanceOf(DepositChangedNotification); // - 5 shares
    expect(memberB.getNotifications()[2]).toBeInstanceOf(OrderCompleteNotification); // Done

    expect(memberC.getDeposit().getAmount()).toEqual(depositSize + 3 * price);
    expect(memberC.getPortfolio().getItem(stock).getQuantity()).toEqual(10 - 3);
    expect(memberC.getNotifications()[0]).toBeInstanceOf(DepositChangedNotification); // + 1000
    expect(memberC.getNotifications()[1]).toBeInstanceOf(DepositChangedNotification); // - 3 shares
  });
});
