import Factory from "./Factory";
import { isNumber } from "../../utils";
import PaymentStatus from "../src/Payment/Enums/PaymentStatus";
import CashPayment from "../src/Payment/Payments/CashPayment";

describe('Vehicle parking', () => {
  const admin = Factory.makeAdmin();
  const agent = Factory.makeAgent();
  const exit = admin.addExit();
  const board = admin.addDisplayBoard();

  test('Pass entrance; parking is full;', () => {
    const entrance = admin.addEntrance();
    const vehicle = Factory.makeCar();
    expect(() => entrance.getTicket(vehicle))
      .toThrow('There are not free spots')
  });

  test('Enter and exit', () => {
    const entrance = admin.addEntrance();
    const vehicle = Factory.makeCar();

    admin.addCompactSpot();
    expect(board.getCompactCount()).toEqual(1);

    // Pass enter

    const ticket = entrance.getTicket(vehicle);

    expect(isNumber(ticket.getId())).toBeTruthy();
    expect(Math.round(ticket.getDuration())).toEqual(0);
    expect(ticket.getEntrance().getId()).toEqual(entrance.getId());
    expect(ticket.getSpot().getVehicle().getLicenseNumber()).toEqual(vehicle.getLicenseNumber());
    expect(ticket.getExit()).toBeNull();
    expect(ticket.isClosed()).toBeFalsy();
    expect(board.getCompactCount()).toEqual(0);

    // Pass exit

    const payment = agent.payTicketByCash(ticket, exit);

    expect(payment).toBeInstanceOf(CashPayment);
    expect(payment.getDate()).not.toBeNull();
    expect(payment.getStatus()).toEqual(PaymentStatus.COMPLETED);
    expect(Math.round(payment.getAmount())).toEqual(0);
    expect(ticket.getExit().getId()).toEqual(exit.getId());
    expect(ticket.isClosed()).toBeTruthy();
    expect(board.getCompactCount()).toEqual(1);
  });

  test('Calculate cost', async () => {
    const entrance = admin.addEntrance();
    const vehicle = Factory.makeCar();
    const stayAtSpot = (time: number) => new Promise(
      (resolve) =>
        setTimeout(() => {
            const payment = agent.payTicketByCard(ticket, exit);
            resolve(payment.getAmount());
          },
          time
        )
    );

    admin.addCompactSpot();

    const ticket = entrance.getTicket(vehicle);
    const cost = await stayAtSpot(1000) as number;
    const rate = 3
    const expectedCost = rate / 60 / 60;
    const diff = Math.abs(expectedCost - cost);
    const allowedDiff = 1 / 1000;
    expect(diff).toBeLessThan(allowedDiff)
  });
});
