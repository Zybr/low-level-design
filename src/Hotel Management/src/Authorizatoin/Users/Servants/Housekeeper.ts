import Servant from "./Servant";
import MasterKey from "../../../Keys/MasterKey";
import System from "../../../System";
import Hotel from "../../../Hotel/Hotel";

export default class Housekeeper extends Servant {
  private key: MasterKey

  public setKey(key: MasterKey): void {
    this.key = key;
  }

  public clean(): void {
    System.getInstance()
      .getCatalog()
      .getCheckedOut()
      .forEach(room => {
        room.open(this.key);
        room.clean();
        room.close(this.key);
      })
  }
}
