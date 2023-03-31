import Meal from "../Meals/Meal";

export default class Item {
  public constructor(
    private readonly meal: Meal,
    private readonly price: number,
  ) {
  }

  public getMeal(): Meal {
    return this.meal;
  }

  public getPrice(): number {
    return this.price;
  }
}
