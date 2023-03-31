import Seat from "./Seat";
import Meal from "../Meal/Meals/Meal";

export default class Table {
  private readonly seats = new Set<Seat>();
  public readonly meals = new Set<Meal>();

  public getSeats(): Seat[] {
    return Array.from(this.seats.values());
  }

  public addSeat(seat: Seat): void {
    this.seats.add(seat);
  }

  public removeSeat(seat: Seat): void {
    this.seats.delete(seat);
  }

  public addMeal(meal: Meal): void {
    this.meals.add(meal);
  }

  public getMeals(): Meal[] {
    return Array.from(this.meals);
  }

  public clear(): void {
    this.meals.clear();
  }
}
