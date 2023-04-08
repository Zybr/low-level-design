import User from "./Group/Users/User/User";
import Page from "./Catalog/Messages/Pages/Page";
import { PrivacyFlag } from "./Catalog/Messages/Pages/Privacy/PrivacyFlag";
import System from "./System";

export default class AccessController {
  public canReadPage(user: User, page: Page): boolean {
    const author = page.getAuthor();
    const privacy = page.getPrivacy();

    if (privacy.getBlacklist().has(user)) {
      return false;
    }

    if (privacy.hasFlag(PrivacyFlag.GUEST_READ)) {
      return true;
    }

    if (
      privacy.hasFlag(PrivacyFlag.FRIENDS_READ)
      && author.getFriendsList().hasUser(user)
    ) {
      return true;
    }


    return privacy.hasFlag(PrivacyFlag.MEMBER_READ)
      && this.hasCommonGroups(author, user);
  }

  public canWritePage(user: User, page: Page): boolean {
    const author = page.getAuthor();
    const privacy = page.getPrivacy();

    if (privacy.getBlacklist().has(user)) {
      return false;
    }

    if (privacy.hasFlag(PrivacyFlag.GUEST_WRITE)) {
      return true;
    }

    if (
      privacy.hasFlag(PrivacyFlag.FIENDS_WRITE)
      && author.getFriendsList().hasUser(user)
    ) {
      return true;
    }


    return privacy.hasFlag(PrivacyFlag.MEMBER_WRITE)
      && this.hasCommonGroups(author, user);
  }

  private hasCommonGroups(userA: User, userB: User): boolean {
    const groupsCatalog = System.getInstance().getGroupsCatalog();
    const userAGroups = new Set(groupsCatalog.getByUser(userA));
    const userBGroups = new Set(groupsCatalog.getByUser(userB));

    return Array.from(userAGroups.values())
      .some(group => userBGroups.has(group));
  }
}
