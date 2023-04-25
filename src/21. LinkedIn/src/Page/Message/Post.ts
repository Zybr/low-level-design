import AbstractMessage from "./AbstractMessage";
import Comment from "./Comment";
import User from "../../Auth/Users/User";
import Page from "../Page";

export default class Post extends AbstractMessage {
  private readonly comments = new Set<Comment>()

  public constructor(
    private readonly page: Page,
    author: User,
    text: string,
  ) {
    super(author, text);
  }

  public getComments(): Comment[] {
    return Array.from(this.comments);
  }

  public addComment(author: User, text: string): Comment {
    const comment = new Comment(this, author, text);
    this.comments.add(comment);

    return comment;
  }

  public removeComment(comment: Comment) {
    this.comments.delete(comment);
  }

  public remove() {
    this.page.removePost(this);
  }
}
