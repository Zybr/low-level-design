import Library from "../src/Library";
import AbstractUser from "../src/Users/Users/AbstractUser";
import Config from "../src/Config";
import Person from "../src/Users/People/Person";
import { faker } from "@faker-js/faker";
import Librarian from "../src/Users/Users/Librarian";
import Member from "../src/Users/Users/Member";
import Author from "../src/Users/People/Author";
import Rack from "../src/Catalog/Books/Rack";
import BookItem from "../src/Catalog/Books/BookItem";
import Format from "../src/Catalog/Books/Format";

export {
  getAdmin,
  makePerson,
  makeLibrarian,
  makeMember,
  makeAuthor,
  makeInt,
  makePastDate,
  makeRack,
  makeItem,
}


const getAdmin = (library: Library): AbstractUser => library
  .login(
    Config.SYSTEM_USERNAME,
    Config.SYSTEM_PASSWORD
  );

const makePerson = (): Person => new Person(
  faker.name.firstName(),
  faker.name.lastName(),
  null,
  faker.internet.email()
);

const makeLibrarian = (library: Library): Librarian => {
  const username = faker.internet.userName();
  const password = faker.internet.password();

  library
    .getAuth(getAdmin(library))
    .registerLibrarian(
      makePerson(),
      username,
      password,
    )
    .member

  return library.login(username, password) as Librarian
}

const makeMember = (library: Library, username: string = null): Member => {
  username = username || faker.internet.userName();
  const password = faker.internet.password();

  library
    .register(
      makePerson(),
      username,
      password
    );

  return library.login(username, password) as Member;
}

const makeAuthor = (): Author => new Author(
  faker.name.firstName(),
  faker.name.lastName(),
);

const makeInt = (max: number) => Math.round(max * Math.random());

const makePastDate = (): Date => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - makeInt(10));
  return date;
}

const makeRack = (): Rack => new Rack(faker.random.word());

const makeItem = (library: Library): BookItem => {
  const item = new BookItem(
    faker.random.alphaNumeric(10),
    faker.word.noun(),
    faker.word.noun(),
    [makeAuthor()],
    makePastDate(),
    makeInt(500),
    Format.Ebook,
    faker.word.noun(),
    faker.word.noun(),
    makeInt(100),
    makeRack()
  );

  library
    .getCatalog(makeLibrarian(library))
    .addItem(item);

  return item;
}
