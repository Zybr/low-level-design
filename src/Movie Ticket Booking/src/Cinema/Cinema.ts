import Hall from "./Hall";
import Show from "../Show";
import Movie from "../Movie/Movie";

export default class Cinema {
  private readonly shows = new Set<Show>();
  private readonly halls: Hall[] = [];

  public createHall(silverCount: number, goldCount: number, platinumCount: number): Hall {
    const hall = new Hall(
      this,
      silverCount,
      goldCount,
      platinumCount
    );

    this.halls.push(hall);

    return hall;
  }

  public getHalls(): Hall[] {
    return this.halls;
  }

  public getShows(): Show[] {
    return Array.from(this.shows);
  }

  public createShow(
    hall: Hall,
    movie: Movie,
    startTime: Date,
    cost: number,
  ): Show {
    if (!this.halls.includes(hall)) {
      throw new Error('Hall is not valid')
    }

    const show = new Show(
      this,
      hall,
      movie,
      startTime,
      cost
    );
    this.shows.add(show);

    return show;
  }

  public removeShow(show: Show): boolean {
    const has = this.shows.has(show);
    this.shows.delete(show);

    return has;
  }
}
