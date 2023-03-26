import { VoteType } from "./VoteType";
import User from "../../Auth/Users/User";

export default class Vote {
  public constructor(
    private readonly author: User,
    private readonly type: VoteType,
  ) {
  }

  public getAuthor(): User {
    return this.author;
  }

  public getType(): VoteType {
    return this.type;
  }
}
