import User from "./User/User";

export default class Admin extends User {
  public blockUser(user: User) {
    user.block();
  }

  public unblockUser(user: User) {
    user.unblock();
  }
}
