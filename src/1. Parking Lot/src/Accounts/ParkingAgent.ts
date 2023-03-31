import Ticket from "../Payment/Ticket";
import Exit from "../ParkingLot/Exit";
import Account from "./Account";
import CashPayment from "../Payment/Payments/CashPayment";
import CardPayment from "../Payment/Payments/CardPayment";

export default class ParkingAgent extends Account {
  public payTicketByCash(ticket: Ticket, exit: Exit): CashPayment {
    return exit.payTicketByCache(ticket);
  }

  public payTicketByCard(ticket: Ticket, exit: Exit): CardPayment {
    return exit.payTicketByCard(ticket);
  }
}
