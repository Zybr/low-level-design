import User from "../User";
import Education from "./Education";
import Work from "./Work";
import Achievement from "./Achievement";
import Recommendation from "./Recommendation";

export default class Profile {
  private educations: Education[] = [];
  private works: Work[] = [];
  private achievements = new Map<string, Achievement>();
  private recommendations = new Map<User, Recommendation>();

  public constructor(
    private readonly user: User
  ) {
  }

  public getEducations(): Education[] {
    return this.educations;
  }

  public setEducations(educations: Education[]) {
    this.educations = educations;
  }

  public getWorks(): Work[] {
    return Array.from(this.works);
  }

  public setWorks(works: Work[]) {
    this.works = Array.from(works);
  }

  public getAchievement(): Achievement[] {
    return Array.from(this.achievements.values());
  }

  public addAchievement(achievement: Achievement) {
    this.achievements.set(achievement.getName(), achievement);
  }

  public removeAchievement(achievement: Achievement) {
    this.achievements.delete(achievement.getName());
  }

  public getRecommendations(): Recommendation[] {
    return Array.from(this.recommendations.values());
  }

  public addRecommendation(recommender: User) {
    this.recommendations.set(recommender, new Recommendation(recommender));
  }

  public removeRecommendation(recommender: User) {
    this.recommendations.delete(recommender);
  }
}
