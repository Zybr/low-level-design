import Page from "./Messages/Pages/Page";
import Topic from "./Messages/Pages/Topic";
import PrivatePage from "./Messages/Pages/PrivatePage";
import User from "../Group/Users/User/User";

export class PagesCatalog {
  protected readonly topics: Topic[] = [];
  protected readonly privatePages = new Map<string, PrivatePage>()

  public getTopics(): Page[] {
    return this.topics;
  }

  public getPrivatePage(owner: User): PrivatePage | null {
    return this.privatePages.get(owner.getUsername()) || null;
  }

  public createPrivatePage(owner: User, text: string): PrivatePage {
    if (this.getPrivatePage(owner)) {
      throw new Error("User's private page is already created");
    }

    const page = new PrivatePage(owner, text);
    this.privatePages.set(owner.getUsername(), page);

    return page;
  }

  public createTopic(author: User, title: string, text: string): Topic {
    const topic = new Topic(author, text, title);
    this.topics.push(topic);

    return topic;
  }
}
