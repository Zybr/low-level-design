import Page from "./Page";
import User from "../../../Group/Users/User/User";

export default class Topic extends Page {
  public constructor(
    author: User,
    text: string,
    private title: string
  ) {
    super(
      author,
      text,
    );
  }

  public getTitle(): string {
    return this.title;
  }

  public setTitle(title: string) {
    this.title = title;
    this.updateTime();
  }
}
