import Library from "../src/Library";
import { makeItem, makeMember } from "./utils";
import BookItem from "../src/Catalog/Books/BookItem";
import { faker } from "@faker-js/faker";


const assertResultContains = (result: BookItem[], target: BookItem) =>
  expect(result.some(item => item === target)).toBeTruthy()

const getRandomItem = (items: BookItem[]): BookItem => items[Math.round(Math.random() * items.length)];

describe('Catalog', () => {
  const library = new Library();
  const member = makeMember(library, 'member-A');
  const items: BookItem[] = [];
  const catalog = library.getCatalog(member);

  for (let i = 0; i < 10; i++) {
    items.push(makeItem(library));
  }

  test('Search by Author', () => {
    const item = getRandomItem(items);
    assertResultContains(
      catalog.searchByAuthor(item.authors[0]),
      item
    );
  });

  test('Search by title', () => {
    const item = getRandomItem(items);
    assertResultContains(
      catalog.searchByTitle(item.title),
      item
    );
  });

  test('Search by subject', () => {
    const item = getRandomItem(items);
    assertResultContains(
      catalog.searchBySubject(item.subject),
      item
    );
  });

  test('Search by date', () => {
    const item = getRandomItem(items);
    assertResultContains(
      catalog.searchByPublicationDate(item.publicationDate),
      item
    );
  });

  test('Search by title - not found', () => {
    expect(catalog.searchByTitle(faker.word.noun()))
      .toHaveLength(0);
  });
});
