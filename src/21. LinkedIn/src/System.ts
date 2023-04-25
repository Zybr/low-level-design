import Authorization from "./Auth/Authorization";
import GroupsCatalog from "./Group/GroupsCatalog";
import PagesCatalog from "./Page/PagesCatalog";
import JobsCatalog from "./Job/JobsCatalog";

export default class System {
  private static instance: System | null;

  private readonly auth = new Authorization();
  private readonly groupsCatalog = new GroupsCatalog();
  private readonly pagesCatalog = new PagesCatalog();
  private readonly jobsCatalog = new JobsCatalog();

  public static getInstance(): System {
    if (!this.instance) {
      this.instance = new System();
    }

    return this.instance;
  }

  private constructor() {
  }

  public getAuth(): Authorization {
    return this.auth;
  }

  public getGroupsCatalog(): GroupsCatalog {
    return this.groupsCatalog;
  }

  public getPagesCatalog(): PagesCatalog {
    return this.pagesCatalog;
  }

  public getJobsCatalog(): JobsCatalog {
    return this.jobsCatalog;
  }
}
