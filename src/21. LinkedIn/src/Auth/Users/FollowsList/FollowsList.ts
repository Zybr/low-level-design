import User from "../User";
import Page from "../../../Page/Page";

export default class FollowsList {
  private readonly topics = new Set<Page>()
  private readonly users = new Set<User>()

  public followPage(page: Page) {
    this.topics.add(page);
  }

  public unfollowPage(page: Page) {
    this.topics.delete(page)
  }

  public followUser(user: User) {
    this.users.add(user);
  }

  public unfollowUser(user: User) {
    this.users.delete(user);
  }
}
