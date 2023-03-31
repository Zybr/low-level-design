import User from "./User";
import System from "../System";

export default class Admin extends User {
  public activateUser(username: string): void {
    System.getInstance()
      .getAuth()
      ?.getUser(username)
      .activate();
  }

  public blockUser(username: string): void {
    System.getInstance()
      .getAuth()
      ?.getUser(username)
      .cancel();
  }
}
