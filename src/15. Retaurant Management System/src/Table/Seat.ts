import Person from "../Person/Person";

export default class Seat {
  private person: Person | null = null;

  public take(person: Person): void {
    this.person = person;
  }

  public free(): void {
    this.person = null;
  }

  public isFree(): boolean {
    return this.person === null;
  }
}
