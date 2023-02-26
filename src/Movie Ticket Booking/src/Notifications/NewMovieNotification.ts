import AbstractNotification from "./AbstractNotification";
import User from "../Persons/User";
import Movie from "../Movie/Movie";

export default class NewMovieNotification extends AbstractNotification {
  public constructor(
    user: User,
    private readonly movie: Movie
  ) {
    super(user);
  }

  public getMovie(): Movie {
    return this.movie;
  }
}
