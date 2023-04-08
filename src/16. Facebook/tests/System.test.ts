import System from "../src/System";
import { faker } from "@faker-js/faker";
import User from "../src/Group/Users/User/User";
import InviteRequestNotification
  from "../src/Notifications/Notifications/UserNotificaiton/Requests/InviteRequestNotification";
import FriendshipRequestNotification
  from "../src/Notifications/Notifications/UserNotificaiton/Requests/FriendshipRequestNotification";
import FriendShipNotification from "../src/Notifications/Notifications/FriendShipNotification";
import Notification from "../src/Notifications/Notifications/Notification";
import { PrivacyFlag } from "../src/Catalog/Messages/Pages/Privacy/PrivacyFlag";
import CreatedCommentNotification from "../src/Notifications/Notifications/CreatedCommentNotification";

const system = System.getInstance();
const auth = system.getAuth();
const subscriptions = system.getSubscriptionsList();

const getLastNotification = <T extends Notification>(user: User): T => {
  return  user.getNotifications().pop() as T;
}

const createUser = (): User => {
  const username = faker.internet.userName();
  const password = faker.internet.password();
  auth.registerUser(username, password);

  return auth.login(username, password) as User;
}

describe('System', () => {
  test('Shape a group', () => {
    const owner = createUser();
    const member = createUser();

    const group = owner.createGroup(faker.word.noun());
    expect(group.getAuthor()).toEqual(owner);

    owner.requestInvite(group, member);
    const inviteNotif = getLastNotification<InviteRequestNotification>(member);
    expect(inviteNotif.getGroup()).toEqual(group);

    inviteNotif.accept();
    expect(group.getUsers()).toHaveLength(1);
    expect(group.getUsers()[0]).toEqual(member);
    expect(subscriptions.getGroupFollowers(group)).toHaveLength(1);
    expect(subscriptions.getGroupFollowers(group)[0]).toEqual(member);
  });

  test('Make a friendship', () => {
    const userA = createUser();
    const userB = createUser();

    userA.requestFriendship(userB);
    const requestNotif = getLastNotification<FriendshipRequestNotification>(userB);

    requestNotif.accept();
    expect(userA.getFriendsList().getUsers()).toHaveLength(1);
    expect(userA.getFriendsList().getUsers()[0]).toEqual(userB);
    const friendshipNotif = getLastNotification<FriendShipNotification>(userA);
    expect(friendshipNotif.getNewFriend()).toEqual(userB);
  });

  test('Make a post', () => {
    const userA = createUser();
    const userB = createUser();
    const topic = userA.createTopic(faker.lorem.word(), faker.lorem.sentence());

    expect(() => userB.postMessage(topic, faker.lorem.sentence()))
      .toThrow(new Error('User is not allowed to write on the page'))

    topic.getPrivacy().addFlag(PrivacyFlag.GUEST_WRITE);
    userB.postMessage(topic, faker.lorem.sentence());

    expect(topic.getPosts()).toHaveLength(1);
    expect(topic.getPosts()[0].getAuthor()).toEqual(userB);
  });

  test('Make a comment', () => {
    const userA = createUser();
    const userB = createUser();
    const userC = createUser();
    const topic = userA.createTopic(faker.lorem.word(), faker.lorem.sentence());

    topic.getPrivacy().addFlag(PrivacyFlag.GUEST_WRITE);
    const post = userB.postMessage(topic, faker.lorem.sentence());
    userC.commentMessage(post, faker.lorem.sentence());

    expect(post.getComments()).toHaveLength(1);
    getLastNotification<CreatedCommentNotification>(userB);
  });

  test('Like/Dislike', () => {
    const userA = createUser();
    const userB = createUser();
    const userC = createUser();
    const topic = userA.createTopic(faker.lorem.word(), faker.lorem.sentence());

    topic.getPrivacy().addFlag(PrivacyFlag.GUEST_WRITE);
    const post = userA.postMessage(topic, faker.lorem.sentence());

    userB.likeMessage(post);
    expect(post.getRate()).toEqual(1);
    userC.dislikeMessage(post)
    expect(post.getRate()).toEqual(0);
  });
})
