import User from "../Authorizatoin/Users/User";

export default abstract class Notification {
  public send(user: User) {
    user.notify(this);
  }
}
