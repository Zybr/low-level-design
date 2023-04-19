import Pilot from "../Authorization/Users/CrewMembers/Pilot";
import Steward from "../Authorization/Users/CrewMembers/Steward";

export default class Crew {
  public constructor(
    private readonly pilots: Pilot[],
    private readonly stewards: Steward[],
  ) {
    if (!pilots.length) {
      throw new Error('Crew pilots are not defined');
    }

    if (!stewards.length) {
      throw new Error('Crew stewards are not defined');
    }
  }

  public getPilots(): Pilot[] {
    return this.pilots;
  }

  public getStewards(): Steward[] {
    return this.stewards;
  }
}
