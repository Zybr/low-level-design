import ParkingLot from "../src/ParkingLot";
import Compact from "../src/ParkingSpots/Compact";
import Handicapped from "../src/ParkingSpots/Handicapped";
import Large from "../src/ParkingSpots/Large";
import Moto from "../src/ParkingSpots/Moto";
import Factory from "./Factory";
import { areEqualEntities, isNumber } from "./utils";

describe('Parking Lot construction', () => {
  const parking = ParkingLot.getInstance();
  const admin = Factory.makeAdmin();

  describe('Admin functions', () => {
    test('Add entrance', () => {
      const entranceA = admin.addEntrance();
      const entranceB = admin.addEntrance();

      expect(isNumber(entranceA.getId())).toBeTruthy();
      expect(isNumber(entranceB.getId())).toBeTruthy();
      expect(areEqualEntities(entranceA, entranceB)).toBeFalsy()
      expect(
        parking.getEntrance(entranceA.getId()).getId()
      ).toEqual(
        entranceA.getId()
      );
      expect(
        parking.getEntrance(entranceB.getId()).getId()
      ).toEqual(
        entranceB.getId()
      );
    });

    test('Add exit', () => {
      const exitA = admin.addExit();
      const exitB = admin.addExit();

      expect(isNumber(exitA.getId())).toBeTruthy();
      expect(isNumber(exitB.getId())).toBeTruthy();
      expect(areEqualEntities(exitA, exitB)).toBeFalsy()
      expect(
        parking.getExit(exitA.getId()).getId()
      ).toEqual(
        exitA.getId()
      );
      expect(
        parking.getExit(exitB.getId()).getId()
      ).toEqual(
        exitB.getId()
      );
    });

    test('Add board', () => {
      const boardA = admin.addDisplayBoard();
      const boardB = admin.addDisplayBoard();

      expect(isNumber(boardA.getId())).toBeTruthy();
      expect(isNumber(boardB.getId())).toBeTruthy();
      expect(areEqualEntities(boardA, boardB)).toBeFalsy()
      expect(
        parking.getBoard(boardA.getId()).getId()
      ).toEqual(
        boardA.getId()
      );
      expect(
        parking.getBoard(boardB.getId()).getId()
      ).toEqual(
        boardB.getId()
      );
      expect(boardA.getCompactCount()).toEqual(0);
      expect(boardA.getHandicappedCount()).toEqual(0);
      expect(boardA.getLargeCount()).toEqual(0);
      expect(boardA.getMotoCount()).toEqual(0);
    });
  });

  describe('Spots', () => {
    const board = admin.addDisplayBoard();

    test('Is full; without spots;', () => {
      expect(parking.isFull()).toBeTruthy();
    });

    test('Add compact spot', () => {
      expect(admin.addCompactSpot()).toBeInstanceOf(Compact);
      expect(board.getCompactCount()).toEqual(1);
      expect(parking.isFull()).toBeFalsy();
    });

    test('Add handicapped spot', () => {
      expect(admin.addHandicappedSpot()).toBeInstanceOf(Handicapped);
      expect(board.getHandicappedCount()).toEqual(1);
    });

    test('Add large spot', () => {
      expect(admin.addLargeSpot()).toBeInstanceOf(Large);
      expect(board.getLargeCount()).toEqual(1);
    });

    test('Add moto spot', () => {
      expect(admin.addMotoSpot()).toBeInstanceOf(Moto);
      expect(board.getMotoCount()).toEqual(1);
    });
  });
});

