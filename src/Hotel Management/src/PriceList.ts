import RoomType from "./Hotel/Room/RoomType";

export default class PriceList {
  private roomTypes = new Map<RoomType, number>();
  private serviceTypes = new Map<string, number>();

  public setRoomTypeCost(type: RoomType, cost: number): void {
    this.roomTypes.set(type, cost);
  }

  public getRoomTypeCost(type: RoomType): number {
    if (!this.roomTypes.has(type)) {
      throw new Error(`Price of room type ${type} is not defined`);
    }

    return this.roomTypes.get(type);
  }

  public setServiceTypeCost(type: string, cost: number): void {
    this.serviceTypes.set(type, cost);
  }

  public getServiceTypeCost(type: string): number {
    return this.serviceTypes.get(type);
  }
}
