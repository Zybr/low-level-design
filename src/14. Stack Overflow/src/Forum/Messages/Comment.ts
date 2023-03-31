import Message from "./Message";
import Writer from "../../Auth/Users/Writer";

export default class Comment extends Message {
  public constructor(author: Writer, text: string) {
    super(author, text);
  }
}
