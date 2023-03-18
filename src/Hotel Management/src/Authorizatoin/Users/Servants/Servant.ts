import Hotel from "../../../Hotel/Hotel";
import User from "../User";

export default abstract class Servant extends User {
  public constructor(
    username: string,
    password: string,
    protected readonly hotel: Hotel
  ) {
    super(username, password);
  }

  public getHotel(): Hotel {
    return this.hotel;
  }
}
