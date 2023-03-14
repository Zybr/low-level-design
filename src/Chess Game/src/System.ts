import Authorization from "./Auth/Authorization";
import Playground from "./Game/Playground";

export default class System {
  private static instance: System | null
  private readonly auth = new Authorization();
  private readonly playground = new Playground();

  public static getInstance(): System {
    return this.instance
      ? this.instance
      : this.instance = new System();
  }

  private constructor() {
  }

  public getAuth(): Authorization {
    return this.auth;
  }

  public getPlayground(): Playground {
    return this.playground;
  }
}
