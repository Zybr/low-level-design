import Writer from "./Writer";

export default class Moderator extends Writer {
  public canVoteClose(): boolean {
    return true;
  }

  public canVoteDelete(): boolean {
    return true;
  }

  public canCreateTag(): boolean {
    return true;
  }
}
