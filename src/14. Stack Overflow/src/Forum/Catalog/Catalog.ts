import Question from "../Messages/Questoin/Questoin";
import Writer from "../../Auth/Users/Writer";

export default class Catalog {
  private readonly questions = new Set<Question>();

  public getQuestions(): Question[] {
    return Array.from(this.questions.values());
  }

  public createQuestion(
    author: Writer,
    text: string,
    title: string,
    tags: string[]
  ): Question {
    const question = new Question(
      author,
      text,
      title
    );
    question.setTags(tags);

    this.questions.add(question);

    return question;
  }
}
