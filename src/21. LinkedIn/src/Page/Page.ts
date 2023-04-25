import User from "../Auth/Users/User";
import Post from "./Message/Post";
import AuthoredInterface from "./AuthoredInterface";

export default class Page implements AuthoredInterface {
  private readonly posts = new Set<Post>()
  private createdAt = new Date();
  private updatedAt = new Date();

  public constructor(
    private author: User,
    private title: string,
    private text: string,
  ) {
  }

  public getAuthor(): User {
    return this.author;
  }

  public getTitle(): string {
    return this.title;
  }

  public setTitle(title: string) {
    this.title = title;
    this.updateChangeTime();
  }

  public getText(): string {
    return this.text;
  }

  public setText(text: string) {
    this.text = text;
  }

  public getPosts(): Post[] {
    return Array.from(this.posts);
  }

  public addPost(author: User, text: string): Post {
    const post = new Post(this, author, text);
    this.posts.add(post);

    return post;
  }

  public removePost(post: Post) {
    this.posts.delete(post);
  }

  public getAuthorPosts(author: User): Post[] {
    return this.getPosts()
      .filter(post => post.getAuthor() === author);
  }

  private updateChangeTime() {
    this.updatedAt = new Date();
  }
}
