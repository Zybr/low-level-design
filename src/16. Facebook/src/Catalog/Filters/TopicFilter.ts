import User from "../../Group/Users/User/User";

export default class TopicFilter {
  public constructor(
    private readonly keyword: string | null,
    private readonly author: User | null,
  ) {
  }

  public getKeyword(): string | null {
    return this.keyword;
  }

  public getAuthor(): User {
    return this.author;
  }
}
