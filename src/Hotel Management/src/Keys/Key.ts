import Room from "../Hotel/Room/Room";

export default abstract class Key {
  public abstract doesFit(room: Room): boolean;
}
