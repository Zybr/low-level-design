import Section from "./Section";

export default class Menu {
  private readonly sections = new Map<string, Section>();

  public getSections(): Section[] {
    return Array.from(this.sections.values());
  }

  public getSection(name: string): Section | null {
    return this.sections.get(name) || null;
  }

  public addSection(name: string): void {
    this.sections.set(name, new Section(name));
  }

  public hasSection(name: string): boolean {
    return this.sections.has(name);
  }

  public removeSection(name: string): void {
    this.sections.delete(name);
  }
}
