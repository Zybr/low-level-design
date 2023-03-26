import Tag from "./Tag";

export default class TagsCollection {
  private readonly tags = new Map<string, Tag>();

  public getAll(): Tag [] {
    return Array.from(this.tags.values());
  }

  public has(name: string): boolean {
    return this.tags.has(name);
  }

  public get(name: string): Tag | null {
    return this.tags.get(name) || null;
  }

  public create(name: string): Tag {
    if (this.has(name)) {
      throw new Error('There is a tag with the same name');
    }

    this.tags.set(name, new Tag(name));

    return this.get(name);
  }
}
