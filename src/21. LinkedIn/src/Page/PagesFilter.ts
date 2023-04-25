import User from "../Auth/Users/User";

export default class PagesFilter {
  private titleKeyword: string | null;
  private textKeyword: string | null;
  private authors = new Set<User>()

  public getTitleKeyword(): string {
    return this.titleKeyword;
  }

  public setTitleKeyword(titleKeyword: string): this {
    this.titleKeyword = titleKeyword;

    return this;
  }

  public getTextKeyword(): string {
    return this.textKeyword;
  }

  public setTextKeyword(textKeyword: string): this {
    this.textKeyword = textKeyword;
    return this;
  }

  public getAuthors(): Set<User> {
    return this.authors;
  }

  public setAuthors(users: User[]): this {
    this.authors = new Set(users);
    return this;
  }
}
