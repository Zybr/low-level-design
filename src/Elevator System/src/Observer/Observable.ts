interface HandleChange {
  (...args): void
}

export default abstract class Observable {
  protected readonly changeHandlers: HandleChange[] = [];

  public onChange(handler: HandleChange): void {
    this.changeHandlers.push(handler);
  }

  protected abstract notify(): void;
}
