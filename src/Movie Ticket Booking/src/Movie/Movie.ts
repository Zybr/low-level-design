export default class Movie {
  private static currentId = 0;
  private readonly id: number;

  public constructor(
    private readonly title: string,
    private readonly genre: string,
    private readonly release: string,
    private readonly language: string,
    private readonly duration: number, // Minutes
  ) {
    this.id = ++Movie.currentId;
  }

  public getId(): number {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getGenre(): string {
    return this.genre;
  }

  public getRelease(): string {
    return this.release;
  }

  public getLanguage(): string {
    return this.language;
  }

  public getDuration(): number {
    return this.duration;
  }
}
