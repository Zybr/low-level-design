export default abstract class Notification {
  public constructor(
    private readonly text: string
  ) {
  }

  public getText(): string {
    return this.text;
  }
}
