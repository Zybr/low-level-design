import System from "../src/System";
import { faker } from "@faker-js/faker";
import Person from "../src/Auth/Users/Person/Person";
import Email from "../src/Auth/Users/Person/Email";
import Phone from "../src/Auth/Users/Person/Phone";
import Admin from "../src/Auth/Users/Admin";
import Customer from "../src/Auth/Users/Customer/Customer";
import Card from "../src/Auth/Users/Customer/Wallet/Card";

const system = System.getInstance();
const auth = system.getAuthorization();
const catalog = system.getCatalog();
const users = {
  admin: {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  },
  deliverer: {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  },
  seller: {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  },
  buyer: {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  },
}
const categories = [
  {
    name: faker.word.noun(),
    products: [
      {
        name: faker.word.noun(),
        quantity: 10,
        price: 1,
      },
      {
        name: faker.word.noun(),
        quantity: 10,
        price: 3,
      },
    ],
  },
  {
    name: faker.word.noun(),
    products: [
      {
        name: faker.word.noun(),
        quantity: 10,
        price: 5,
      },
    ],
  },
  {
    name: null,
    products: [
      {
        name: faker.word.noun(),
        quantity: 10,
        price: 7,
      },
    ],
  }
];

const initSystem = () => {
  createUsers();
  fillCatalog();
}

const createUsers = () => {
  auth.registerAdmin(createPerson(), users.admin.username, users.admin.password);
  auth.registerDeliverer(createPerson(), users.deliverer.username, users.deliverer.password);
  auth.registerCustomer(createPerson(), users.seller.username, users.seller.password);
  auth.registerCustomer(createPerson(), users.buyer.username, users.buyer.password);

  const buyer = auth.login(users.buyer.username, users.buyer.password) as Customer;
  buyer.getWallet().addCash(100);
  buyer.getWallet().setCard(new Card());
  buyer.getWallet().getCard().addMoney(100);
}

const fillCatalog = () => {
  const admin = auth.login(users.admin.username, users.admin.password) as Admin;
  const seller = auth.login(users.seller.username, users.seller.password) as Customer;

  categories.forEach(categoryItem => {
    const products = categoryItem.products
      .map(
        productItem => seller.createProduct(
          productItem.name,
          productItem.quantity,
          productItem.price
        )
      )
    if (categoryItem.name) {
      const category = admin.createCategory(categoryItem.name);
      products.forEach(product => category.addProduct(product));
    }
  });
}

const createPerson = () => {
  return new Person(
    new Email(faker.internet.email()),
    new Phone(faker.phone.number()),
  );
}

describe('System', () => {
  const fillCart = () => {
    const buyer = auth.login(users.buyer.username, users.buyer.password) as Customer;
    const totalPrice =
      2 * categories[0].products[0].price
      + 2 * categories[1].products[0].price;

    buyer.getCart().addItem(
      catalog.search({
        name: categories[0].products[0].name,
      })[0],
      2
    );
    buyer.getCart().addItem(
      catalog.search({
        name: categories[1].products[0].name,
      })[0],
      2
    );

    return {
      buyer,
      totalPrice,
    }
  }

  beforeAll(() => initSystem());

  it('Init system', () => {
    expect(auth.getAdmins()).toHaveLength(1);
    expect(auth.getDeliverers()).toHaveLength(1);
    expect(auth.getCustomers()).toHaveLength(2);

    catalog
      .getCategories()
      .forEach(
        (category, inx) => {
          const categoryItem = categories[inx];
          expect(category.getName()).toEqual(categoryItem.name);
          expect(category.getProducts()).toHaveLength(categoryItem.products.length)
        }
      );
  });

  it('Make an order', () => {
    const {buyer, totalPrice} = fillCart();
    expect(buyer.getCart().getItems()).toHaveLength(2);
    expect(buyer.getCart().getCost()).toEqual(totalPrice);

    const order = buyer.getCart().order();
    expect(order.isPending()).toBeTruthy();
    expect(order.getItems()).toHaveLength(2);
    expect(order.getCost()).toEqual(totalPrice);
  });

  it('Cancel an order', () => {
    const {buyer, totalPrice} = fillCart();
    const order = buyer.getCart().order();

    order.confirm();
    expect(order.isConfirmed()).toBeTruthy();
    expect(buyer.getWallet().getCard().getMoney()).toBe(100 - totalPrice);

    order.cancel();
    expect(order.isCanceled()).toBeTruthy();
    expect(buyer.getWallet().getCard().getMoney()).toBe(100);
  });

  it('Deliver and order', () => {
    const {buyer, totalPrice} = fillCart();
    buyer.getWallet().setCard(null);
    const order = buyer.getCart().order();

    order.confirm();
    expect(buyer.getWallet().getTotalMoney()).toEqual(100);

    system.processOrders();
    expect(order.isComplete()).toBeTruthy();
    expect(buyer.getDeliveredOrders()).toHaveLength(1);
    expect(buyer.getWallet().getTotalMoney()).toBe(100 - totalPrice);
  });
})
