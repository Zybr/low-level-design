import Table from "./Table";

export default class TablesList {
  private readonly tables = new Set<Table>();

  public getTables(): Table[] {
    return Array.from(this.tables);
  }

  public addTable(table: Table): void {
    this.tables.add(table);
  }

  public removeTable(table): void {
    this.tables.delete(table);
  }
}
