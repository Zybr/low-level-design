import Atm from "./Atm/Atm";

export default class History {
  private messages: string[] = [];

  public addAtmText(atm: Atm) {
    this.messages.push(atm.getScreen().getText());
  }

  public clear() {
    this.messages = [];
  }

  public getLogs(): string[] {
    return this.messages;
  }
}
