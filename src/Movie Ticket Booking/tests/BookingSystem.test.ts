import BookingSystem from "../src/BookingSystem";
import User from "../src/Persons/User";
import Person from "../src/Persons/Person";
import { faker } from "@faker-js/faker";
import Address from "../src/Persons/Address";
import Cinema from "../src/Cinema/Cinema";
import Movie from "../src/Movie/Movie";
import Show from "../src/Show";
import NewMovieNotification from "../src/Notifications/NewMovieNotification";
import PlatinumSeat from "../src/Cinema/PlatinumSeat";
import CachePayment from "../src/Payments/CachePayment";
import Ticket from "../src/Ticket";
import CanceledNotification from "../src/Notifications/CanceledNotification";
import Booking from "../src/Booking";

const createPerson = (): Person => {
  return new Person(
    faker.name.firstName(),
    faker.internet.email(),
    createAddress()
  )
}

const createAddress = (): Address => {
  return new Address(
    faker.address.country(),
    faker.address.state(),
    faker.address.city(),
    faker.address.zipCode(),
  )
}

const createCinema = (): Cinema => {
  const cinema = new Cinema();
  cinema.createHall(5, 5, 5)
  cinema.createHall(5, 5, 5)
  cinema.createHall(5, 5, 5)

  return cinema;
}

const createMovie = (): Movie => {
  return new Movie(
    faker.word.noun(),
    faker.word.noun(),
    faker.date.past().toDateString(),
    faker.word.noun(),
    faker.datatype.number({min: 30, max: 180})
  );
}

const createShow = (cinema: Cinema, movie: Movie): Show => {
  return cinema.createShow(
    cinema.getHalls()[faker.datatype.number({min: 0, max: cinema.getHalls().length - 1})],
    movie,
    faker.date.future(),
    faker.datatype.number({min: 3, max: 10})
  );
}

const book = (system: BookingSystem, user: User): Ticket => {
  const title = system.getCatalog().getMovies()[0].getTitle();
  const movie = system.getCatalog().findByTitle(title)[0];
  const show = system.getShows(movie)[0];
  const seat = show.getFreeSeats().find(seat => seat instanceof PlatinumSeat);
  const cost = show.getPlatinumCost();
  const booking = show.book(user, seat);

  return booking.confirm(
    new CachePayment(booking.getCost())
      .pay(user.subtractMoney(cost))
  );
}

const assertHasCancelNotification = (user: User, booking: Booking) => {
  const notification = user.getNotifications()
    .filter(notification => notification instanceof CanceledNotification)
    .pop() as CanceledNotification;
  expect(notification).toBeDefined();
  expect(notification.getBooking()).toEqual(booking);
}

describe('BookingSystem', () => {
  let system: BookingSystem;
  let userA: User;
  let userB: User;

  beforeEach(() => {
    system = new BookingSystem();
    for (let i = 1; i <= 10; i++) {
      system.getCatalog().addMovie(createMovie());
    }

    const movies = system.getCatalog().getMovies();

    for (let i = 0; i < 3; i++) {
      const cinema = createCinema();
      system.addCinema(cinema);
      movies.forEach(movie => createShow(cinema, movie));
    }

    userA = system.registerUser(createPerson());
    userA.addMoney(100);
    userB = system.registerUser(createPerson());
    userB.addMoney(100);
  });

  test('new movie', () => {
    const newMovie = createMovie();
    system.getCatalog().addMovie(newMovie);

    expect(userA.getNotifications().length).toEqual(1);
    const notification = userA.getNotifications()[0] as NewMovieNotification;
    expect(notification).toBeInstanceOf(NewMovieNotification)
    expect(notification.getMovie().getId()).toEqual(newMovie.getId())
  });

  test('book', () => {
    // Define movie
    const title = system.getCatalog().getMovies()[0].getTitle();
    const movie = system.getCatalog().findByTitle(title)[0];
    expect(movie.getTitle()).toEqual(title);

    // Define show
    const show = system.getShows(movie)[0];
    expect(show.getMovie().getId()).toEqual(movie.getId());

    // Define seat
    const seat = show.getFreeSeats().find(seat => seat instanceof PlatinumSeat);
    const cost = show.getPlatinumCost();

    // Book
    const booking = show.book(userA, seat);
    expect(booking.getUser()).toEqual(userA);
    expect(booking.getShow()).toEqual(show);
    expect(booking.getSeat().getNum()).toEqual(seat.getNum())
    expect(booking.getCost()).toEqual(cost);
    expect(booking.getPayment()).toBeNull()
    expect(booking.isConfirmed()).toBeFalsy()

    // Pay
    const ticket = booking.confirm(
      new CachePayment(booking.getCost())
        .pay(userA.subtractMoney(cost))
    );
    expect(ticket.getBooking().isConfirmed()).toBeTruthy();
    expect(show.getFreeSeats().includes(seat)).toBeFalsy();
    expect(userA.getMoney()).toEqual(100 - cost);
  });

  test('cancel booking', () => {
    const ticket = book(system, userA);

    ticket.getBooking()
      .getShow()
      .cancelBooking(ticket)

    assertHasCancelNotification(userA, ticket.getBooking());
    expect(ticket.getBooking().isConfirmed()).toBeFalsy();
    expect(userA.getMoney()).toEqual(100);
  });

  test('cancel show', () => {
    const ticket = book(system, userA);
    const show = ticket.getBooking().getShow();

    show.cancel();

    assertHasCancelNotification(userA, ticket.getBooking());
    expect(ticket.getBooking().isConfirmed()).toBeFalsy();
    expect(userA.getMoney()).toEqual(100);
  });
})
