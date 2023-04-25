import User from "../User";

export default class Recommendation {
  public constructor(
    private readonly recommender: User,
  ) {
  }

  public getRecommender(): User {
    return this.recommender
  }
}
