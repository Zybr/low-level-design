import User from "./User";

export default class Admin extends User {
  public blockUser(user: User) {
    user.block();
  }

  public unblockUser(user: User) {
    user.activate();
  }
}
