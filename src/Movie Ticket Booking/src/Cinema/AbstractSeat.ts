import Hall from "./Hall";

export default abstract class AbstractSeat {
  public constructor(
    private readonly hall: Hall,
    private readonly num: number
  ) {
  }

  public getHall(): Hall {
    return this.hall;
  }

  public getNum(): number {
    return this.num;
  }
}
