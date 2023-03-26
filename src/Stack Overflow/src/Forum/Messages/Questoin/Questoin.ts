import Message from "../Message";
import Writer from "../../../Auth/Users/Writer";
import System from "../../../System";
import Tag from "./Tag/Tag";
import Answer from "../Answer";
import Comment from "../Comment";
import { QuestionStatus } from "./QuestionStatus";
import Bounty from "../../../Reputation/Bounty";
import Account from "../../../Auth/Users/Account";
import Moderator from "../../../Auth/Users/Moderator";
import Voting from "../../../Reputation/Vote/Voting";
import CatalogSearch from "../../Catalog/CatalogSearch";
import CloseNotification from "../../../Notifications/CloseNotification";

export default class Question extends Message {
  private readonly BOUNTY_RATE = 10;
  private readonly tags = new Set<Tag>()
  private readonly answers = new Set<Answer>();
  private readonly comments = new Set<Comment>();
  private bounty: Bounty | null = null;
  private status: QuestionStatus = QuestionStatus.Active;
  private acceptedAnswer: Answer | null = null;

  public constructor(
    author: Writer,
    text: string,
    private title: string
  ) {
    super(
      author,
      text,
    );
  }

  public getTitle(): string {
    return this.title;
  }

  public setTags(tagsNames: string[]): void {
    const tags = System.getInstance()
      .getTags();

    tagsNames.forEach(name => {
      if (!tags.has(name) && this.getAuthor().canCreateTag()) {
        tags.create(name);
      }

      if (tags.has(name)) {
        const tag = tags.get(name);
        this.tags.add(tag);
        tag.incrementRate();
      }
    });
  }

  public getTags(): Tag[] {
    return Array.from(this.tags);
  }

  public getAnswers(): Answer[] {
    return Array.from(this.answers);
  }

  public getComments(): Comment[] {
    return Array.from(this.comments);
  }

  public hasBounty(): boolean {
    return !!this.bounty;
  }

  public enableBounty(): void {
    this.bounty = new Bounty(this.BOUNTY_RATE);
  }

  public disableBounty(): void {
    this.bounty = null;
  }

  // Status >>>

  public isActive(): boolean {
    return this.status === QuestionStatus.Active;
  }

  public isAnswered(): boolean {
    return this.status === QuestionStatus.Answered;
  }

  public isClosed(): boolean {
    return this.status === QuestionStatus.Closed;
  }

  public isDeleted(): boolean {
    return this.status === QuestionStatus.Deleted;
  }

  public close(): void {
    this.assertStatuses([QuestionStatus.Active, QuestionStatus.Answered]);
    this.status = QuestionStatus.Closed;
    new CloseNotification(this.getAuthor(), this)
      .send();
  }

  public restore(): void {
    this.assertStatuses([QuestionStatus.Closed])
    this.status = QuestionStatus.Active;
  }

  public delete(): void {
    this.assertStatuses([QuestionStatus.Active, QuestionStatus.Answered, QuestionStatus.Closed]);
    this.status = QuestionStatus.Deleted;
  }

  public accept(answer: Answer): void {
    if (!this.answers.has(answer)) {
      throw new Error("The question doesn't have this answer");
    }

    this.acceptedAnswer = answer;
    this.status = QuestionStatus.Answered;
  }

  // <<< Status

  // Answers >>>

  public createAnswer(author: Writer, text: string): void {
    const answer = new Answer(this, author, text);
    this.answers.add(answer);
    self.getCatalog().addAnswer(answer);
  }

  public deleteAnswer(answer: Answer): void {
    this.answers.delete(answer);
    self.getCatalog().deleteAnswer(answer);
  }

  public acceptAnswer(answer: Answer): void {
    if (!this.answers.has(answer)) {
      throw new Error("Question doesn't have this answer");
    }

    this.answers.delete(answer);
  }

  // <<< Answers

  // Comments >>>

  public createComment(author: Writer, text: string): void {
    const comment = new Comment(author, text);
    this.comments.add(comment);
    self.getCatalog().addComment(comment);
  }

  public deleteComment(comment: Comment): void {
    if (!this.comments.has(comment)) {
      throw  new Error("Question doesn't have this comment");
    }

    this.comments.delete(comment);
    self.getCatalog().deleteComment(comment);
  }

  // <<< Comments

  // >>> Voting

  public voteDown(author: Writer): void {
    this.voting.voteUp(author);
  }

  public voteClose(author: Account): void {
    if (author instanceof Moderator) {
      this.close();
    } else {
      this.voting.voteClose(author as Writer);
      if (this.voting.getClosesNum() >= Voting.DECISION_VOTE_NUM) {
        this.close()
      }
    }
  }

  public voteDelete(author: Account): void {
    if (author instanceof Moderator) {
      this.delete();
    } else {
      this.voting.voteDelete(author as Writer);
      if (this.voting.getDeletesNum() >= Voting.DECISION_VOTE_NUM) {
        this.delete();
      }
    }
  }

  // <<< Voting

  private assertStatuses(statuses: QuestionStatus[]): void {
    if (!statuses.includes(this.status)) {
      throw new Error(`Status must be ${statuses}`);
    }
  }

  private static getCatalog(): CatalogSearch {
    return System.getInstance()
      .getCatalog();
  }
}
const self = Question;

