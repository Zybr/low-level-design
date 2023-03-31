import Restaurant from "./Restaurant";

export default class System {
  private restaurants = new Set<Restaurant>();

  private static instance: System | null;

  private constructor() {
  }

  public static getInstance(): System {
    if (!System.instance) {
      System.instance = new System();
    }

    return System.instance;
  }

  public getRestaurants(): Restaurant[] {
    return Array.from(this.restaurants);
  }

  public addRestaurant(restaurant: Restaurant): void {
    this.restaurants.add(restaurant);
  }

  public removeRestaurant(restaurant: Restaurant): void {
    this.restaurants.delete(restaurant);
  }
}
