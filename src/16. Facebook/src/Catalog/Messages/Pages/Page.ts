import Privacy from "./Privacy/Privacy";
import Post from "./PageMessages/Post";
import { PrivacyFlag } from "./Privacy/PrivacyFlag";
import User from "../../../Group/Users/User/User";
import Message from "../Message";
import System from "../../../System";

export default class Page extends Message {
  private readonly privacy = new Privacy();
  private readonly posts: Post[] = [];

  public constructor(author: User, text: string) {
    super(author, text);
    this.privacy.addFlag(PrivacyFlag.FIENDS_WRITE);
  }

  public getPrivacy(): Privacy {
    return this.privacy;
  }

  public getPosts(): Post[] {
    return this.posts;
  }

  public addPost(author: User, text: string): Post {
    const isAllowed = System.getInstance()
      .getAccessController()
      .canWritePage(author, this);

    if (!isAllowed) {
      throw new Error('User is not allowed to write on the page');
    }

    const post = new Post(author, text);
    this.posts.push(post);

    return post;
  }
}
