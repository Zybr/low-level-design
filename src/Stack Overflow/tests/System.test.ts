import { faker } from "@faker-js/faker";
import System from "../src/System";
import Admin from "../src/Auth/Users/Admin";
import Moderator from "../src/Auth/Users/Moderator";
import Writer from "../src/Auth/Users/Writer";
import Guest from "../src/Auth/Users/Guest";
import { BadgeType } from "../src/Reputation/Badge/BadgeType";
import Question from "../src/Forum/Messages/Questoin/Questoin";

const system = System.getInstance();
const auth = system.getAuth();
const catalog = system.getCatalog();
const tags = system.getTags();

const createCredentials = (name: string = null) => ({
  name: name || faker.internet.userName(),
  pass: faker.internet.password(),
});

const credentials = {
  admin: createCredentials('admin'),
  moderator: createCredentials('moderator'),
  writerA: createCredentials('writerA'),
  writerB: createCredentials('writerB'),
  writerC: createCredentials('writerC'),
}

const tagNames = [
  faker.word.noun(),
  faker.word.noun(),
  faker.word.noun(),
  faker.word.noun(),
  faker.word.noun(),
];

const createUsers = () => {
  auth.registerAdmin(credentials.admin.name, credentials.admin.pass);
  auth.registerModerator(credentials.moderator.name, credentials.moderator.pass);
  auth.registerWriter(credentials.writerA.name, credentials.writerA.pass);
  auth.registerWriter(credentials.writerB.name, credentials.writerB.pass);
  auth.registerWriter(credentials.writerC.name, credentials.writerC.pass);
}

const createTags = () => {
  tagNames.forEach(tagName => tags.create(tagName))
}

describe('System', () => {
  let admin: Admin;
  let moder: Moderator;
  let writerA: Writer;
  let writerB: Writer;
  let writerC: Writer;

  beforeAll(() => {
    createUsers();
    createTags();
    admin = auth.login(credentials.admin.name, credentials.admin.pass) as Admin;
    moder = auth.login(credentials.moderator.name, credentials.moderator.pass) as Moderator;
    writerA = auth.login(credentials.writerA.name, credentials.writerA.pass) as Writer;
    writerB = auth.login(credentials.writerB.name, credentials.writerB.pass) as Writer;
    writerC = auth.login(credentials.writerC.name, credentials.writerC.pass) as Writer;
  });

  test('init', () => {
    expect(admin).toBeInstanceOf(Admin);
    expect(moder).toBeInstanceOf(Moderator);
    expect(writerA).toBeInstanceOf(Writer);
    expect(writerB).toBeInstanceOf(Writer);

    expect(moder.canCreateTag()).toBeTruthy();
    expect(moder.canVoteDelete()).toBeTruthy();
    expect(moder.canVoteClose()).toBeTruthy();

    const assertHasNoAccess = (writer: Writer) => {
      expect(writer.canCreateTag()).toBeFalsy();
      expect(writer.canVoteDelete()).toBeFalsy();
      expect(writer.canVoteClose()).toBeFalsy();
    }

    assertHasNoAccess(writerA);
    assertHasNoAccess(writerB);
    assertHasNoAccess(writerC);

    tagNames.forEach(tagName => {
      expect(tags.has(tagName)).toBeTruthy();
      expect(tags.get(tagName).getRate()).toEqual(0)
    });
  });

  test('post question', () => {
    const questionTags = [
      ...tagNames.slice(0, 2),
      faker.word.noun(),
      faker.word.noun(),
    ];
    writerA.postQuestion(
      faker.lorem.text(),
      faker.word.noun(),
      questionTags,
    );

    const questions = catalog.getQuestions();
    expect(questions).toHaveLength(1);
    const question = questions[0];
    expect(question.getTags()).toHaveLength(2);
    expect(question.getAnswers()).toHaveLength(0);
    expect(question.getComments()).toHaveLength(0);
    expect(question.getAuthor().getUsername()).toEqual(writerA.getUsername());
    expect(question.getRate()).toEqual(0);
    expect(question.getFlags()).toHaveLength(0);

    expect(catalog.searchQuestionsByTag(questionTags[0])).toHaveLength(1)
    expect(catalog.searchQuestionsByTag(questionTags[3])).toHaveLength(0)
    expect(catalog.searchMessagesByAuthor(writerA.getUsername())).toHaveLength(1);

    expect(tags.get(questionTags[0]).getRate()).toEqual(1);
    expect(tags.get(questionTags[1]).getRate()).toEqual(1);
    expect(tags.has(questionTags[2])).toBeFalsy();
    expect(tags.has(questionTags[3])).toBeFalsy();
  });

  test('post answer', () => {
    const question = catalog.getQuestions()[0];
    writerB.postAnswer(question, faker.lorem.text());

    expect(question.getAnswers()).toHaveLength(1);

    expect(catalog.searchMessagesByAuthor(writerB.getUsername())).toHaveLength(1);
  });

  test('post comment', () => {
    const question = catalog.getQuestions()[0];
    const answer = question.getAnswers()[0];
    writerB.postComment(question, faker.lorem.text());
    writerB.postComment(answer, faker.lorem.text());

    expect(question.getComments()).toHaveLength(1);
    expect(answer.getComments()).toHaveLength(1);

    expect(catalog.searchMessagesByAuthor(writerB.getUsername())).toHaveLength(3); // answer + 2 comments
  });

  test('vote up', () => {
    const question = catalog.getQuestions()[0];
    const questionComment = question.getComments()[0]
    const answer = question.getAnswers()[0];
    const answerComment = answer.getComments()[0];
    const guest = new Guest();

    const receiver = writerA;
    question.voteUp(writerB) // A+
    questionComment.voteUp(writerA) // B+
    answer.voteUp(writerA) // B+
    answer.voteDown(writerC) // B-
    answerComment.voteUp(writerA) // B+
    answerComment.voteUp(guest) // B+

    expect(writerA.getRate()).toEqual(1);
    expect(writerA.getNotifications()).toHaveLength(2); // 1up + 1silver
    expect(writerB.getRate()).toEqual(3);
    const badgesA = writerA.getBadges();
    expect(badgesA).toHaveLength(1);
    expect(badgesA[0].getType()).toEqual(BadgeType.Silver)

    expect(writerB.getRate()).toEqual(3); // 4up - 1down
    expect(writerB.getNotifications()).toHaveLength(7); // 4up + 1down + 1silver + 1gold
    const badgesB = writerB.getBadges();
    expect(badgesB).toHaveLength(2); // silver + gold
    expect(badgesB[0].getType()).toEqual(BadgeType.Silver)
    expect(badgesB[1].getType()).toEqual(BadgeType.Gold)
  });

  test('vote to delete', () => {
    const question = catalog.getQuestions()[0];
    const answer = question.getAnswers()[0];
    const upWriter = (writer: Writer, rate: number) => {
      writer.postQuestion(
        faker.lorem.text(),
        faker.word.noun(),
        []
      );
      const question = catalog.searchMessagesByAuthor(writer.getUsername())[0] as Question;

      auth.getUsers().filter(user => user instanceof Writer)
        .slice(0, rate)
        .forEach(writer => question.voteUp(writer));
    }

    expect(writerA.canVoteDelete()).toBeFalsy();
    expect(writerB.canVoteDelete()).toBeTruthy();
    expect(writerC.canVoteDelete()).toBeFalsy();
    answer.voteDelete(writerA);
    answer.voteDelete(writerB);
    answer.voteDelete(writerC);

    expect(question.getAnswers()).toHaveLength(1);

    upWriter(writerA, 3);
    upWriter(writerB, 3);
    upWriter(writerC, 3);
    expect(writerA.canVoteDelete()).toBeTruthy();
    expect(writerB.canVoteDelete()).toBeTruthy();
    expect(writerC.canVoteDelete()).toBeTruthy();
    answer.voteDelete(writerA);
    answer.voteDelete(writerB);
    answer.voteDelete(writerC);

    expect(question.getAnswers()).toHaveLength(0);
  });
})
