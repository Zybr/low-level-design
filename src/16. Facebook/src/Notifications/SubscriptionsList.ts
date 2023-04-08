import User from "../Group/Users/User/User";
import Group from "../Group/Group";

export default class SubscriptionsList {
  private readonly usersFollowers = new Map<User, Set<User>>();
  private readonly groupsFollowers = new Map<Group, Set<User>>();

  public getUserFollowers(user: User): User [] {
    return Array.from(this.usersFollowers.get(user) || []);
  }

  public followUser(user: User, follower: User) {
    this.initFollowers(this.usersFollowers, user);
    this.usersFollowers.get(user)
      .add(follower);
  }

  public unfollowUser(user: User, follower: User) {
    this.initFollowers(this.usersFollowers, user);
    this.usersFollowers.get(user)
      .delete(follower);
  }

  public getGroupFollowers(group: Group): User [] {
    return Array.from(this.groupsFollowers.get(group) || []);
  }

  public followGroup(group: Group, follower: User) {
    this.initFollowers(this.groupsFollowers, group);
    this.groupsFollowers.get(group)
      .add(follower);
  }

  public unfollowGroup(group: Group, follower: User = null) {
    this.initFollowers(this.groupsFollowers, group);

    if (follower) {
      this.groupsFollowers.get(group)
        .delete(follower);
    } else {
      this.groupsFollowers.get(group)
        .clear();
    }
  }

  public initFollowers(followers: Map<User | Group, Set<User>>, item: Group | User) {
    followers.set(
      item,
      followers.get(item) || new Set<User>
    )
  }
}
