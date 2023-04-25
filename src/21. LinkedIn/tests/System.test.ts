import System from "../src/System";
import User from "../src/Auth/Users/User";
import { faker } from "@faker-js/faker";
import PagesFilter from "../src/Page/PagesFilter";
import CommentNotification from "../src/Notification/CommentNotification";
import OpeningFilter from "../src/Job/OpeningFilter";
import ApplyNotification from "../src/Notification/ApplyNotification";
import GroupsFilter from "../src/Group/GroupsFilter";
import InvitationNotification from "../src/Notification/InvitationNotification";
import GroupInvitation from "../src/Invitations/GroupInvitation";

const system = System.getInstance();

const createUser = (): User => {
  const username = faker.internet.userName();
  const password = faker.internet.password();

  system.getAuth()
    .createUser(username, password)

  return system.getAuth()
    .login(username, password) as User;
}


describe('System', () => {
  test('Write', () => {
    const userA = createUser();
    const userB = createUser();
    const userC = createUser();

    // Create page

    const page = userA.createPage(
      faker.lorem.sentence(),
      faker.lorem.text(),
    );
    expect(page.getAuthor()).toEqual(userA);
    expect(
      system.getPagesCatalog()
        .search(
          new PagesFilter()
            .setAuthors([userA])
        )
    ).toHaveLength(1);

    // Create post

    const post = page.addPost(
      userB,
      faker.lorem.sentence()
    );
    expect(page.getAuthorPosts(userB)).toEqual([post]);

    // Create comment

    const comment = userC.createComment(
      post,
      faker.lorem.sentence()
    );
    expect(post.getComments()).toEqual([comment]);
    expect(userB.getNotifications()).toHaveLength(1);
    expect(userB.getNotifications()[0]).toBeInstanceOf(CommentNotification);
  });

  test('Find job', () => {
    const userA = createUser();
    const userB = createUser();

    // Open job

    const opening = userA.openJob(
      faker.company.name(),
      faker.word.noun()
    )
    expect(
      system.getJobsCatalog()
        .search(
          new OpeningFilter()
            .setCompany(opening.getCompany())
            .setPosition(opening.getPosition())
        )
    ).toHaveLength(1)

    // Apply for the job

    userB.applyJob(opening);
    expect(userA.getNotifications()).toHaveLength(1)
    expect(userA.getNotifications()[0]).toBeInstanceOf(ApplyNotification)
  });

  test('Make group', () => {
    const userA = createUser();
    const userB = createUser();

    // Create group

    const group = userA.createGroup(faker.word.noun());
    expect(
      system.getGroupsCatalog()
        .search(
          new GroupsFilter()
            .setNameKeyword(group.getName())
        )
    ).toHaveLength(1)

    // Invite member

    userA.inviteIntoGroup(group, userB)
    expect(userB.getNotifications()).toHaveLength(1);
    expect(userB.getNotifications()[0]).toBeInstanceOf(InvitationNotification);

    // Join group

    const notification = userB.getNotifications()[0] as unknown as InvitationNotification<GroupInvitation>;
    notification.getInvitation().accept();
    expect(group.getMembers()).toEqual([userB]);
  })
});
