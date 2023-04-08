import Authorization from "./Group/Users/Authorization";
import GroupsCatalog from "./Group/GroupsCatalog";
import AccessController from "./AccessController";
import SubscriptionsList from "./Notifications/SubscriptionsList";
import { PagesCatalog } from "./Catalog/PagesCatalog";

export default class System {
  private static instance: System | null;

  private readonly auth = new Authorization();
  private readonly groupsCatalog = new GroupsCatalog();
  private readonly pagesCatalog = new PagesCatalog();
  private readonly accessController = new AccessController();
  private readonly subscriptionsList = new SubscriptionsList();

  private constructor() {
  }

  public static getInstance(): System {
    if (!this.instance) {
      this.instance = new System();
    }

    return this.instance;
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

  public getAccessController(): AccessController {
    return this.accessController;
  }

  public getSubscriptionsList(): SubscriptionsList {
    return this.subscriptionsList;
  }
}
