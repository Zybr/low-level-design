import Branch from "./Branch";

export default class Restaurant {
  private readonly branches = new Set<Branch>();

  public getBranches(): Branch[] {
    return Array.from(this.branches.values());
  }

  public addBranch(branch: Branch): void {
    this.branches.add(branch);
  }

  public removeBranch(branch: Branch): void {
    this.branches.delete(branch);
  }
}
