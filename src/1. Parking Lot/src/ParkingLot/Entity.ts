export default class Entity {
  private static currentId: number = 0;
  private readonly id: number;

  public constructor() {
    this.id = ++Entity.currentId;
  }

  getId(): number {
    return this.id;
  }
}
