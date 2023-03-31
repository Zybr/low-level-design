import Account from "./Account";
import System from "../../System";

export default class Admin extends Account {
  public blockUser(username: string): void {
    System.getInstance()
      .getAuth()
      .getUser(username)
      ?.block();
  }

  public unblockUser(username: string): void {
    System.getInstance()
      .getAuth()
      .getUser(username)
      ?.unblock();
  }
}
