import Authorization from "./Auth/Authorization";
import TagsCollection from "./Forum/Messages/Questoin/Tag/TagsCollection";
import CatalogSearch from "./Forum/Catalog/CatalogSearch";
import ReputationController from "./Reputation/ReputationController";

export default class System {
  private static instance: System | null = null;
  private readonly authorization = new Authorization();
  private readonly tags = new TagsCollection();
  private readonly catalog = new CatalogSearch();
  private readonly reputationCtrl = new ReputationController();

  private constructor() {
  }

  public static getInstance(): System {
    if (!System.instance) {
      System.instance = new System();
    }

    return System.instance;
  }

  public getAuth(): Authorization {
    return this.authorization;
  }

  public getTags(): TagsCollection {
    return this.tags;
  }

  public getCatalog(): CatalogSearch {
    return this.catalog;
  }

  public getReputationController(): ReputationController {
    return this.reputationCtrl;
  }
}
