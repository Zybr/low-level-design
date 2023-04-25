import JobOpening from "./JobOpening";
import User from "../Auth/Users/User";
import OpeningFilter from "./OpeningFilter";

export default class JobsCatalog {
  private readonly openings = new Set<JobOpening>();

  public search(filter: OpeningFilter = null): JobOpening[] {
    if (!filter) {
      return this.getOpenings();
    }

    return this.getOpenings()
      .filter(opening => {
        if (filter.getCompany() && opening.getCompany() !== filter.getCompany()) {
          return false;
        }

        if (filter.getPosition() && opening.getPosition() !== filter.getPosition()) {
          return false;
        }

        return true;
      });
  }

  public addOpening(employer: User, company: string, position: string): JobOpening {
    const opening = new JobOpening(employer, company, position);
    this.openings.add(opening);

    return opening;
  }

  public removeOpening(opening: JobOpening) {
    this.openings.delete(opening);
  }

  private getOpenings(): JobOpening[] {
    return Array.from(this.openings);
  }
}
