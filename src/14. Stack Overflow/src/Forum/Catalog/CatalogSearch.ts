import Catalog from "./Catalog";
import Search from "./Search";
import Message from "../Messages/Message";
import Question from "../Messages/Questoin/Questoin";
import Writer from "../../Auth/Users/Writer";
import Answer from "../Messages/Answer";
import Comment from "../Messages/Comment";

export default class CatalogSearch extends Catalog implements Search {
  private readonly questionsByAuthor = new Map<string, Question[]>();
  private readonly answersByAuthor = new Map<string, Answer[]>();
  private readonly commentsByAuthor = new Map<string, Comment[]>();
  private readonly questionsByTag = new Map<string, Question[]>();

  public createQuestion(author: Writer, text: string, title: string, tags: string[]): Question {
    const question = super.createQuestion(author, text, title, tags);
    this.addToCollectionMap(
      this.questionsByAuthor,
      author.getUsername(),
      question
    );
    question.getTags()
      .forEach(tag => this.addToCollectionMap(
        this.questionsByTag,
        tag.getName(),
        question
      ));

    return question;
  }

  public addAnswer(answer: Answer): void {
    this.addToCollectionMap(
      this.answersByAuthor,
      answer.getAuthor().getUsername(),
      answer
    );
  }

  public deleteAnswer(answer: Answer): void {
    this.answersByAuthor.delete(answer.getAuthor().getUsername());
  }

  public addComment(comment: Comment): void {
    this.addToCollectionMap(
      this.commentsByAuthor,
      comment.getAuthor().getUsername(),
      comment
    );
  }

  public deleteComment(comment: Comment): void {
    this.commentsByAuthor.delete(comment.getAuthor().getUsername());
  }

  public searchMessagesByAuthor(username: string): Message[] {
    return [
      ...this.questionsByAuthor.get(username) || [],
      ...this.answersByAuthor.get(username) || [],
      ...this.commentsByAuthor.get(username) || [],
    ];
  }

  public searchQuestionByText(text: string): Question[] {
    return this.getQuestions()
      .filter(
        question => question.getTitle().match(new RegExp(`${text}`))
          || question.getText().match(new RegExp(`${text}`))
      )
  }

  public searchQuestionsByAuthor(username: string): Question[] {
    return this.questionsByAuthor.get(username) || [];
  }

  public searchQuestionsByTag(tagName: string): Question[] {
    return this.questionsByTag.get(tagName) || [];
  }

  private addToCollectionMap(collection: Map<string, Message[]>, key: string, message: Message): void {
    collection.set(key, collection.get(key) || []);
    collection.get(key).push(message);
  }
}
