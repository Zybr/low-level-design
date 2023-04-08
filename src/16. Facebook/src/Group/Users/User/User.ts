import Profile from "./Profile/Profile";
import Feed from "./Feed";
import FriendsList from "./FriendsList";
import Group from "../../Group";
import BaseUser from "../BaseUser";
import DirectMessageNotification from "../../../Notifications/Notifications/UserNotificaiton/DirectMessageNotification";
import InviteRequestNotification
  from "../../../Notifications/Notifications/UserNotificaiton/Requests/InviteRequestNotification";
import FriendshipRequestNotification
  from "../../../Notifications/Notifications/UserNotificaiton/Requests/FriendshipRequestNotification";
import PageMessage from "../../../Catalog/Messages/Pages/PageMessages/PageMessage";
import System from "../../../System";
import Topic from "../../../Catalog/Messages/Pages/Topic";
import Page from "../../../Catalog/Messages/Pages/Page";
import Post from "../../../Catalog/Messages/Pages/PageMessages/Post";
import Comment from "../../../Catalog/Messages/Pages/PageMessages/Comment";

export default class User extends BaseUser {
  private readonly profile = new Profile();
  private readonly feed = new Feed(this);
  private readonly friendsList = new FriendsList(this);

  public getProfile(): Profile {
    return this.profile;
  }

  public getFeed(): Feed {
    return this.feed;
  }

  public getFriendsList(): FriendsList {
    return this.friendsList;
  }

  public requestFriendship(user: User) {
    new FriendshipRequestNotification(user, this);
  }

  public createGroup(name: string): Group {
    return System.getInstance()
      .getGroupsCatalog()
      .create(this, name);
  }

  public joinGroup(group: Group) {
    group.addUser(this);
  }

  public requestInvite(group: Group, user: User) {
    new InviteRequestNotification(user, this, group);
  }

  public createTopic(title: string, text: string): Topic {
    return System.getInstance()
      .getPagesCatalog()
      .createTopic(this, title, text);
  }

  public postMessage(topic: Page, text: string): Post {
    return topic.addPost(this, text);
  }

  public commentMessage(message: PageMessage, text: string): Comment {
    return message.addComment(this, text);
  }

  public likeMessage(message: PageMessage) {
    message.like(this);
  }
  public dislikeMessage(message: PageMessage) {
    message.dislike(this);
  }

  public sendMessage(user: User, text: string) {
    new DirectMessageNotification(user, this, text);
  }

  public share(message: PageMessage, receiver: User) {
    message.share(this, receiver);
  }
}
