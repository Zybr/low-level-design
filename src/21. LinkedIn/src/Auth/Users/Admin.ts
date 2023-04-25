import AbstractUser from "./AbstractUser/AbstractUser";
import Group from "../../Group/Group";
import Page from "../../Page/Page";
import System from "../../System";

export default class Admin extends AbstractUser {
  public blockUser(user: AbstractUser) {
    user.block();
  }

  public unblockUser(user: AbstractUser) {
    user.unblock();
  }

  public removePage(page: Page) {
    System.getInstance()
      .getPagesCatalog()
      .removePage(page);
  }

  public removeGroup(group: Group) {
    System.getInstance()
      .getGroupsCatalog()
      .removeGroup(group);
  }
}
