import Question from "./Questoin/Questoin";
import Writer from "../../Auth/Users/Writer";
import Comment from "./Comment";
import Message from "./Message";
import Moderator from "../../Auth/Users/Moderator";
import { QuestionStatus } from "./Questoin/QuestionStatus";
import Voting from "../../Reputation/Vote/Voting";
import CatalogSearch from "../Catalog/CatalogSearch";
import System from "../../System";

export default class Answer extends Message {
  private readonly comments = new Set<Comment>()

  public constructor(
    private question: Question,
    author: Writer,
    text: string,
  ) {
    super(author, text);
  }

  public getComments(): Comment[] {
    return Array.from(this.comments.values());
  }

  public createComment(author: Writer, text: string): void {
    const comment = new Comment(author, text);
    this.comments.add(comment);
    self.getCatalog().addComment(comment);
  }

  public deleteComment(comment: Comment): void {
    this.comments.delete(comment);
    self.getCatalog().deleteComment(comment);
  }

  public voteDown(author: Writer): void {
    this.voting.voteDown(author);
  }

  public voteDelete(author: Writer): void {
    if (author instanceof Moderator) {
      this.question.deleteAnswer(this);
    } else {
      this.voting.voteClose(author as Writer);

      if (this.voting.getClosesNum() >= Voting.DECISION_VOTE_NUM) {
        this.question.deleteAnswer(this);
      }
    }
  }

  private static getCatalog(): CatalogSearch {
    return System.getInstance()
      .getCatalog();
  }
}
const self = Answer;
