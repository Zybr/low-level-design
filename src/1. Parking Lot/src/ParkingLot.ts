import Entrance from "./ParkingLot/Entrance";
import Exit from "./ParkingLot/Exit";
import DisplayBoard from "./ParkingLot/DisplayBoard";
import ParkingSpot from "./ParkingSpots/ParkingSpot";
import Compact from "./ParkingSpots/Compact";
import Handicapped from "./ParkingSpots/Handicapped";
import Large from "./ParkingSpots/Large";
import Moto from "./ParkingSpots/Moto";
import ParkingRate from "./Payment/ParkingRate";
import { rate } from "./config.json";

export default class ParkingLot {
  private static instance?: ParkingLot;

  private readonly rate: ParkingRate;
  private readonly entrances: Entrance[] = [];
  private readonly exits: Exit[] = [];
  private readonly boards: DisplayBoard[] = [];
  private readonly spots: ParkingSpot[] = [];

  private constructor() {
    this.rate = new ParkingRate(
      rate.hours,
      rate.rate
    )
  }

  public static getInstance(): ParkingLot {
    if (!ParkingLot.instance) {
      ParkingLot.instance = new ParkingLot();
    }

    return ParkingLot.instance;
  }

  public getRate(): ParkingRate {
    return this.rate;
  }

  public createEntrance(): Entrance {
    const entrance = new Entrance();
    this.entrances.push(entrance);
    return entrance;
  }

  public getEntrance(id: number): Entrance {
    return this.entrances.find(entrance => id === entrance.getId());
  }

  public createExit(): Exit {
    const exit = new Exit();
    this.exits.push(exit);
    return exit;
  }

  public getExit(id: number): Exit {
    return this.exits.find(exit => id === exit.getId());
  }

  public createBoard(): DisplayBoard {
    const board = new DisplayBoard();
    this.boards.push(board)

    return board;
  }

  public getBoard(id: number): DisplayBoard {
    return this.boards.find(board => id === board.getId());
  }

  public createCompactSpot(): Compact {
    const spot = new Compact();
    this.spots.push(spot);
    return spot;
  }

  public createHandicappedSpot(): Handicapped {
    const spot = new Handicapped();
    this.spots.push(spot);
    return spot;
  }

  public createLargeSpot(): Large {
    const spot = new Large();
    this.spots.push(spot);
    return spot;
  }

  public createMotoSpot(): Moto {
    const spot = new Moto();
    this.spots.push(spot);
    return spot;
  }

  public getSpots(): ParkingSpot[] {
    return this.spots;
  }

  public isFull(): boolean {
    return this.spots.every(spot => !spot.isFree());
  }
}
