import Hotel from "../Hotel/Hotel";
import RoomType from "../Hotel/Room/RoomType";

export default interface RoomsFilter {
  hotel?: Hotel;
  types?: RoomType[];
  costMin?: number;
  costMax?: number;
}
