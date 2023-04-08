import User from "./User";

export default class Feed {
  public constructor(
    private readonly user: User
  ) {
  }

  public getTopics() {
    // TODO: Provide topics of user's groups-members/friends
  }

  public getPosts() {
    // TODO: Provide topics of related user's friends
  }
}
