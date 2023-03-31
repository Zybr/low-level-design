import { faker } from '@faker-js/faker';
import Person from "../src/Person/Person";
import Branch from "../src/Branch";
import Manager from "../src/Employees/Manager";
import System from "../src/System";
import Restaurant from "../src/Restaurant";
import Address from "../src/Address";
import { ProductType } from "../src/Meal/Storage/Product/ProductType";
import { randomInt } from "../../utils";
import Dish from "../src/Meal/Meals/Dish";
import Product from "../src/Meal/Storage/Product/Product";
import Drink from "../src/Meal/Meals/Drink";
import Card from "../src/Person/Wallet/Card";
import Period from "../src/Reservation/Period";
import Reservation from "../src/Reservation/Reservation";
import Item from "../src/Meal/Menu/Item";

const system = System.getInstance();
let person: Person;
const storeProducts = {
  [ProductType.Meat]: 100,
  [ProductType.Water]: 100,
  [ProductType.Bread]: 100,
  [ProductType.Milk]: 100,
  [ProductType.Vegetable]: 100,
}
const menuItems = {
  drinks: [
    {
      ingredients: [{
        type: ProductType.Milk,
        weight: randomInt(10, 1),
      }],
      price: randomInt(10, 1),
    },
    {
      ingredients: [{
        type: ProductType.Water,
        weight: randomInt(10, 1),
      }],
      price: randomInt(10, 1),
    },
  ],
  dishes: [
    {
      ingredients: [{
        type: ProductType.Meat,
        weight: randomInt(10, 1),
      }],
      price: randomInt(10, 1),
    },
    {
      ingredients: [{
        type: ProductType.Bread,
        weight: randomInt(10, 1),
      }],
      price: randomInt(10, 1),
    },
    {
      ingredients: [{
        type: ProductType.Vegetable,
        weight: randomInt(10, 1),
      }],
      price: randomInt(10, 1),
    },
  ]
}

const initSystem = () => {
  createRestaurant();
  createBranch();
  createEmployees();
  person = createPerson();
  fillStore();
  fillMenu();
  createTables();
}

const getBranch = (): Branch => {
  return System.getInstance()
    .getRestaurants()[0]
    .getBranches()[0];
}
const getManager = (): Manager => {
  return getBranch().getManagers()[0];
}

const createRestaurant = () => {
  system.addRestaurant(new Restaurant())
}

const createBranch = () => {
  system.getRestaurants()[0]
    .addBranch(new Branch(createAddress()));
}

const createAddress = () => {
  return new Address(
    faker.address.country(),
    faker.address.state(),
    faker.address.city(),
    faker.address.streetAddress(),
    faker.address.zipCode(),
  );
}

const createEmployees = () => {
  createManager();
  createReceptionist();
  createChef();
  createWaiter();
}

const createManager = () => {
  getBranch().addManager(
    new Manager(
      createPerson(),
      getBranch(),
    )
  );
}

const createReceptionist = () => {
  getManager().createReceptionist(createPerson())
}

const createChef = () => {
  getManager().createChef(createPerson())
}

const createWaiter = () => {
  getManager().createWaiter(createPerson())
}

const createPerson = () => {
  const person = new Person(
    faker.name.fullName(),
    faker.phone.number(),
  );

  person.getWallet().addCash(1000);
  person.getWallet().addCard(new Card().addMoney(1000));

  return person;
}

const fillStore = () => {
  Object.keys(storeProducts).forEach((type) => {
    getBranch()
      .getManagers()[0]
      .supplyProduct(parseInt(type), storeProducts[type])
  });
}

const fillMenu = () => {
  for (const item of Object.values(menuItems.drinks)) {
    const products = item.ingredients.map(({type, weight}) => new Product(type, weight));
    new Drink(products);
    getManager().addMenuItem('Drinks', new Drink(products), item.price);
  }

  for (const item of Object.values(menuItems.dishes)) {
    const products = item.ingredients.map(({type, weight}) => new Product(type, weight));
    new Dish(products);
    getManager().addMenuItem('Dishes', new Dish(products), item.price);
  }
}

const createTables = () => {
  for (let i = 0; i < 5; i++) {
    getManager().addTable(4);
  }
}

describe('System', () => {
  const getPersonReservation = (): Reservation => getBranch()
    .getReservations()
    .getPersonActiveReservation(person);
  const makePeriod = (): Period => new Period(new Date(), new Date(new Date().getTime() + 1000 * 60 * 60));
  const getDrink = (): Item => getBranch()
    .getMenu()
    .getSection('Drinks')
    .getItems()[0];
  const getDish = (): Item => getBranch()
    .getMenu()
    .getSection('Dishes')
    .getItems()[0]

  beforeEach(() => {
    system.getRestaurants()
      .forEach(restaurant => system.removeRestaurant(restaurant));
    initSystem();
  });

  test('Init', () => {
    expect(getBranch()).toBeDefined();
    expect(getBranch().getManagers()).toHaveLength(1);
    expect(getBranch().getReceptionists()).toHaveLength(1);
    expect(getBranch().getChefs()).toHaveLength(1);
    expect(getBranch().getWaiters()).toHaveLength(1);

    expect(getBranch().getMenu()).toBeDefined();
    expect(getBranch().getMenu().getSection('Drinks')).toBeDefined();
    expect(getBranch().getMenu().getSection('Drinks').getItems()).toHaveLength(menuItems.drinks.length);
    expect(getBranch().getMenu().getSection('Dishes')).toBeDefined();
    expect(getBranch().getMenu().getSection('Dishes').getItems()).toHaveLength(menuItems.dishes.length);

    expect(getBranch().getTables().getTables()).toHaveLength(5);
    expect(getBranch().getTables().getTables()[0].getSeats()).toHaveLength(4);

    expect(person.getWallet().getTotalAmount()).toEqual(2000);
  });

  test('Make reservation', () => {
    person.reserveTable(getBranch(), makePeriod());

    expect(getPersonReservation()).toBeDefined();
  });

  test('Take table', () => {
    person.reserveTable(getBranch(), makePeriod());
    person.takeTable();

    expect(getPersonReservation().isActive()).toBeTruthy();
    expect(getPersonReservation().getTable().getSeats().some(seat => !seat.isFree())).toBeDefined()
  });

  test('Make order', () => {
    person.reserveTable(getBranch(), makePeriod());
    person.takeTable();
    person.makeOrder([getDrink(), getDish()]);

    expect(getPersonReservation().getTable().getMeals()).toHaveLength(2);
  });

  test('Free table', () => {
    person.reserveTable(getBranch(), makePeriod());
    const table = getPersonReservation().getTable();
    person.takeTable();
    person.makeOrder([getDrink(), getDish()]);
    person.freeTable();

    expect(person.getWallet().getTotalAmount()).toBeLessThan(2000);
    expect(table.getSeats().every(seat => seat.isFree())).toBeTruthy();
  });
})
