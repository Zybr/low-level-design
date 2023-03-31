import User from "./User";
import Category from "../../Catalog/Product/Category";
import System from "../../System";

export default class Admin extends User {
  public blockUser(user: User) {
    user.block();
  }

  public unblockUser(user: User) {
    user.unblock();
  }

  public createCategory(name: string): Category {
    return System.getInstance()
      .getCatalog()
      .createCategory(name);
  }

  public removeCategory(name: string): void {
    System.getInstance()
      .getCatalog()
      .getCategories()
      .find(category => category.getName() === name)
      ?.remove()
  }
}
