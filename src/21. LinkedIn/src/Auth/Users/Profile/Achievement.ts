export default class Achievement {
  public constructor(
    private readonly name: string,
  ) {
  }

  public getName(): string {
    return this.name;
  }
}
