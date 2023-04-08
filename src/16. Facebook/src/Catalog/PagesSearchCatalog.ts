import { PagesCatalog } from "./PagesCatalog";
import SearchPagesInterface from "./SearchPagesInterface";
import PageMessage from "./Messages/Pages/PageMessages/PageMessage";
import MessageFilter from "./Filters/MessageFilter";
import TopicFilter from "./Filters/TopicFilter";
import User from "../Group/Users/User/User";
import Topic from "./Messages/Pages/Topic";

export default class PagesSearchCatalog extends PagesCatalog implements SearchPagesInterface {
  private readonly userTopics = new Map<string, Set<Topic>>;

  public createTopic(author: User, title: string, text: string): Topic {
    this.userTopics.set(
      author.getUsername(),
      this.userTopics.get(author.getUsername()) || new Set<Topic>
    )

    const topic = super.createTopic(author, title, text);
    this.userTopics.get(author.getUsername()).add(topic)

    return topic;
  }

  public searchMessages(filter: MessageFilter): PageMessage[] {
    const collectComments = (message: PageMessage) => {
      const comments = [];
      message.getComments()
        .forEach(comment => comments.push(comment, ...collectComments(comment)));
      return comments;
    }

    return this.topics
      .reduce(
        (messages, topic) => {
          topic.getPosts()
            .forEach(post => messages.push(post, ...collectComments(post)));
          return messages;
        },
        []
      )
      .filter(message => {
        if (filter.getAuthor() && message.getAuthor() !== filter.getAuthor()) {
          return false;
        }

        return !(filter.getKeyword() && message.getText().search(filter.getKeyword()) === -1);
      });
  }

  public searchTopics(filter: TopicFilter): Topic[] {
    const authorTopics = new Set<Topic>();
    const keywordTopics = new Set<Topic>();

    if (filter.getAuthor()) {
      Array.from(this.userTopics.get(filter.getAuthor().getUsername()))
        .forEach(topic => authorTopics.add(topic));
    }

    if (filter.getKeyword()) {
      this.topics
        .forEach(topic => {
          if (
            topic.getTitle().search(filter.getKeyword()) !== -1
            || topic.getText().search(filter.getKeyword()) !== -1
          ) {
            keywordTopics.add(topic);
          }
        })
    }

    if (filter.getKeyword()) {
      return Array.from(authorTopics);
    }

    if (filter.getAuthor()) {
      return Array.from(keywordTopics);
    }

    return Array.from(authorTopics)
      .filter(topic => keywordTopics.has(topic));
  }
}
