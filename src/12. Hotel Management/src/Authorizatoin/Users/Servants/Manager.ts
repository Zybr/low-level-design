import Receptionist from "./Receptionist";
import Hotel from "../../../Hotel/Hotel";
import Housekeeper from "./Housekeeper";

export default class Manager extends Receptionist {
  public addManager(username: string, password: string, hotel: Hotel): Manager {
    const manager = new Manager(username, password, hotel);
    hotel.addManager(manager);

    return manager;
  }

  public addReceptionist(username: string, password: string, hotel: Hotel): Receptionist {
    const receptionist = new Receptionist(username, password, hotel);
    hotel.addReceptionist(receptionist);

    return receptionist;
  }

  public addHousekeeper(username: string, password: string, hotel: Hotel): Housekeeper {
    const housekeeper = new Housekeeper(username, password, hotel);
    hotel.addHousekeeper(housekeeper);

    return housekeeper;
  }
}
