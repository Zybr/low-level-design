import User from "../User";

export default class ConnectionsList {
  private readonly connections = new Set<User>;

  public getConnections(): User[] {
    return Array.from(this.connections);
  }

  public addConnection(user: User) {
    this.connections.add(user);
  }

  public removeConnection(user: User) {
    this.connections.delete(user);
  }
}
