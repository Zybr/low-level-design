import Person from "../Person/Person";

export default abstract class Notification {
  public constructor(
    private readonly person: Person
  ) {
    this.sent();
  }

  public abstract getText(): string;

  private sent(): void {
    this.person.getPhone().pushNotification(this);
  }
}
