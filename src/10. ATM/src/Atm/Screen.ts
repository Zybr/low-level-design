export default class Screen {
  public text: string = '';

  public getText(): string {
    return this.text;
  }

  public setText(text: string) {
    this.text = text;
  }
}
