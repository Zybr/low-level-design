import Ticket from "../Payment/Ticket";
import Entity from "./Entity";
import CashPayment from "../Payment/Payments/CashPayment";
import CardPayment from "../Payment/Payments/CardPayment";
import ParkingLot from "../ParkingLot";

export default class Exit extends Entity {
  public payTicketByCache(ticket: Ticket): CashPayment {
    const payment = new CashPayment(this.getTicketPrice(ticket));
    ticket.close(this, payment);

    return payment;
  }

  public payTicketByCard(ticket: Ticket): CardPayment {
    const payment = new CardPayment(this.getTicketPrice(ticket));
    ticket.close(this, payment);

    return payment;
  }

  private getTicketPrice(ticket: Ticket): number {
    if (ticket.isClosed()) {
      throw new Error('Ticket is already payed.');
    }

    return ParkingLot
      .getInstance()
      .getRate()
      .calculate(ticket.getDuration());
  }
}
