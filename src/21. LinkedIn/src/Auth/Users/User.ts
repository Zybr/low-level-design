import AbstractUser from "./AbstractUser/AbstractUser";
import AbstractNotification from "../../Notification/AbstractNotification";
import ConnectionsList from "./ConnectionsList/ConnectionsList";
import Profile from "./Profile/Profile";
import FollowsList from "./FollowsList/FollowsList";
import Page from "../../Page/Page";
import System from "../../System";
import Post from "../../Page/Message/Post";
import AuthoredInterface from "../../Page/AuthoredInterface";
import Comment from "../../Page/Message/Comment";
import ConnectionInvitation from "../../Invitations/ConnectionInvitation";
import Group from "../../Group/Group";
import GroupInvitation from "../../Invitations/GroupInvitation";
import JobOpening from "../../Job/JobOpening";
import AbstractMessage from "../../Page/Message/AbstractMessage";
import ShareNotification from "../../Notification/ShareNotification";
import MessageNotification from "../../Notification/MessageNotification";

export default class User extends AbstractUser {
  private readonly notifications: AbstractNotification[] = [];
  private readonly profile = new Profile(this);
  private readonly connectionsList = new ConnectionsList();
  private readonly followsList = new FollowsList();

  public getProfile(): Profile {
    return this.profile;
  }

  public getConnectionsList(): ConnectionsList {
    return this.connectionsList;
  }

  public getFollowsList(): FollowsList {
    return this.followsList;
  }


  public getNotifications(): AbstractNotification[] {
    return this.notifications;
  }

  public notify(notification: AbstractNotification) {
    this.notifications.push(notification);
  }


  public createPage(title: string, text: string): Page {
    return System.getInstance()
      .getPagesCatalog()
      .createPage(this, title, text)
  }

  public removePage(page: Page) {
    this.assertIsAuthored(page);

    System.getInstance()
      .getPagesCatalog()
      .removePage(page);
  }


  public createPost(page: Page, text: string): Post {
    return page.addPost(this, text);
  }

  public editPost(post: Post, text: string) {
    this.assertIsAuthored(post);
    post.setText(text);
  }

  public removePost(post: Post) {
    post.remove();
  }


  public createComment(post: Post, text: string): Comment {
    return post.addComment(this, text);
  }

  public editComment(comment: Comment, text: string) {
    comment.setText(text);
  }

  public removeComment(comment: Comment) {
    comment.remove();
  }


  public connectUser(user: User): ConnectionInvitation {
    return new ConnectionInvitation(user, this);
  }

  public disconnectUser(user: User) {
    this.getConnectionsList().removeConnection(user);
  }


  public createGroup(name: string): Group {
    return System.getInstance()
      .getGroupsCatalog()
      .createGroup(this, name);
  }

  public removeGroup(group: Group) {
    return System.getInstance()
      .getGroupsCatalog()
      .removeGroup(group);
  }

  public inviteIntoGroup(group: Group, user: User): GroupInvitation {
    return new GroupInvitation(user, group);
  }


  public openJob(company: string, position: string): JobOpening {
    return System.getInstance()
      .getJobsCatalog()
      .addOpening(this, company, position);
  }

  public applyJob(opening: JobOpening) {
    opening.apply(this);
  }


  public shareMessage(message: AbstractMessage, user: User) {
    new ShareNotification(user, this, message);
  }


  public sendMessage(receiver: User, text: string) {
    new MessageNotification(receiver, this, text);
  }

  private assertIsAuthored(message: AuthoredInterface) {
    if (message.getAuthor() !== this) {
      throw new Error("User can't remove page since he is not the author");
    }
  }
}
