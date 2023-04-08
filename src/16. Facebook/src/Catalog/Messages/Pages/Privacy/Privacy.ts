import User from "../../../../Group/Users/User/User";
import { PrivacyFlag } from "./PrivacyFlag";

export default class Privacy {
  private flags = 0;
  private blacklist = new Set<User>();

  public getBlacklist(): Set<User> {
    return this.blacklist;
  }

  public addFlag(flag: PrivacyFlag) {
    this.flags = this.flags | flag;
  }

  public removeFlag(flag: PrivacyFlag) {
    this.flags = this.flags & ~flag;
  }

  public hasFlag(flag: PrivacyFlag): boolean {
    return (this.flags & flag) === flag;
  }
}
