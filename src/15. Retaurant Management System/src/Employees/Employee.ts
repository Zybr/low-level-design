import Branch from "../Branch";
import Person from "../Person/Person";

export default abstract class Employee {
  public constructor(
    private readonly person: Person,
    private readonly branch: Branch,
  ) {
  }

  public getBranch(): Branch {
    return this.branch;
  }
}
