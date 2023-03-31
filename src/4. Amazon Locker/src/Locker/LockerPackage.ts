import Package from "../Package";

export default class LockerPackage {
  private readonly deliveredAt = new Date();

  public constructor(
    private readonly pack: Package,
    private readonly code: string,
    private readonly validDays: number,
  ) {
  }

  public isValidCode(code: string): boolean {
    const date = this.deliveredAt;
    const now = new Date();

    if (
      date.getFullYear() !== now.getFullYear()
      || date.getMonth() !== now.getMonth()
      || (now.getDate() - date.getDate() > this.validDays)
    ) {
      return false;
    }

    return code === this.code;
  }

  public getPackage(): Package {
    return this.pack;
  }
}
