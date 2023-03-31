import Game from "../src/Game";
import Dealer from "../src/Users/Dealer";
import { faker } from "@faker-js/faker";
import Person from "../src/Users/Person";
import Address from "../src/Users/Address";
import Gambler from "../src/Users/Gambler";
import { randomInt } from "../../utils";

const makeDealer = (): Dealer => {
  return new Dealer(
    makePerson(),
    faker.name.firstName(),
    faker.name.lastName(),
  );
}

const makePlayer = (): Gambler => {
  return new Gambler(
    makePerson(),
    faker.name.firstName(),
    faker.name.lastName(),
  );
}

const makePerson = (): Person => {
  return new Person(
    faker.name.firstName(),
    faker.name.lastName(),
    makeAddress()
  );
}

const makeAddress = (): Address => {
  return new Address(
    faker.address.country(),
    faker.address.city(),
    faker.address.streetAddress(),
    faker.address.zipCode()
  )
}

describe('Game', () => {
  const dealer = makeDealer();
  const player = makePlayer();
  const game = dealer.createGame(player);

  player.setStrategy((player, game) => {
    // game.placeBet(randomInt(10, 1))
    game.placeBet(1)

    while (
      player.getHand().getScore() < 16
      && !player.getHand().isOverflowed()
      ) {
      game.hit(player);
    }

    game.stand(player);
  });

  test('play()', () => {
    for (let i = 0; i < 10000; i++) {
      game.play();
    }

    game.getLog().show();
    expect(true).toBeTruthy();
  });
});
