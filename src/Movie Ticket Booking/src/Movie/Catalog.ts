import Movie from "./Movie";
import UsersList from "../UsersList";
import NewMovieNotification from "../Notifications/NewMovieNotification";

export default class Catalog {
  private movies = new Set<Movie>();
  private readonly sections = new Map([
    ['title', new Map<string, Set<Movie>>()],
    ['genre', new Map<string, Set<Movie>>()],
    ['release', new Map<string, Set<Movie>>()],
    ['language', new Map<string, Set<Movie>>()],
  ])

  public constructor(
    private usersList: UsersList,
  ) {
  }

  public addMovie(movie: Movie): void {
    if (this.movies.has(movie)) {
      throw new Error('Movies is already added.');
    }

    this.movies.add(movie);
    this.addToMap(this.sections.get('title'), movie.getTitle(), movie);
    this.addToMap(this.sections.get('genre'), movie.getGenre(), movie);
    this.addToMap(this.sections.get('release'), movie.getRelease(), movie);
    this.addToMap(this.sections.get('language'), movie.getLanguage(), movie);

    this.usersList
      .getUsers()
      .forEach(user => new NewMovieNotification(user, movie).send());
  }

  private removeMovie(movie): void {
    if (!this.movies.has(movie)) {
      return;
    }

    this.movies.delete(movie);
    this.sections.get('title').get(movie.getTitle()).delete(movie);
    this.sections.get('genre').get(movie.getGenre()).delete(movie);
    this.sections.get('release').get(movie.getRelease()).delete(movie);
    this.sections.get('language').get(movie.getLanguage()).delete(movie);
  }

  public getMovies(): Movie[] {
    return Array.from(this.movies);
  }

  public findByTitle(title: string): Movie [] {
    return Array.from(this.sections.get('title').get(title)?.values() || []);
  }

  public findByGenre(genre: string): Movie [] {
    return Array.from(this.sections.get('genre').get(genre)?.values() || []);
  }

  public findByRelease(release: string): Movie [] {
    return Array.from(this.sections.get('release').get(release)?.values() || []);
  }

  public findByLanguage(language: string): Movie [] {
    return Array.from(this.sections.get('language').get(language)?.values() || []);
  }

  private addToMap(map: Map<string, Set<Movie>>, key: string, movie: Movie): void {
    if (!map.has(key)) {
      map.set(key, new Set<Movie>);
    }

    map.get(key).add(movie);
  }
}
