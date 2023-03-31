import Catalog from "./Movie/Catalog";
import Cinema from "./Cinema/Cinema";
import Show from "./Show";
import Person from "./Persons/Person";
import User from "./Persons/User";
import UsersList from "./UsersList";
import Movie from "./Movie/Movie";

export default class BookingSystem {
  private readonly catalog: Catalog;
  private readonly cinemas = new Set<Cinema>();
  private readonly usersList: UsersList;

  public constructor() {
    this.usersList = new UsersList();
    this.catalog = new Catalog(this.usersList);
  }

  public addCinema(cinema: Cinema): void {
    this.cinemas.add(cinema);
  }

  public registerUser(person: Person): User {
    const user = new User(
      person.getName(),
      person.getEmail(),
      person.getAddress(),
    );
    this.usersList.addUser(user);

    return user;
  }

  public getCatalog(): Catalog {
    return this.catalog;
  }

  public getShows(movie: Movie) {
    const shows: Show[] = [];

    this.cinemas
      .forEach(
        cinema => cinema
          .getShows()
          .filter(show => show.getMovie() === movie)
          .forEach(show => shows.push(show))
      );

    return shows;
  }
}
