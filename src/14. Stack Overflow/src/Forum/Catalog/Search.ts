import Message from "../Messages/Message";
import Question from "../Messages/Questoin/Questoin";

export default interface Search {
  searchMessagesByAuthor(username: string): Message[]

  searchQuestionsByAuthor(username: string): Question[]

  searchQuestionsByTag(tagName: string): Question []

  searchQuestionByText(text: string): Question[]
}
