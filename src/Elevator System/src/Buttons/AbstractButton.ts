export default abstract class AbstractButton {
  protected pressed: boolean = false;

  public isPressed(): boolean {
    return this.pressed;
  }

  public press(): void {
    this.pressed = true;
  }

  protected unpress(): void {
    this.pressed = false;
  }
}
