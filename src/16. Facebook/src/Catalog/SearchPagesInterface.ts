import Page from "./Messages/Pages/Page";
import PageMessage from "./Messages/Pages/PageMessages/PageMessage";
import TopicFilter from "./Filters/TopicFilter";
import MessageFilter from "./Filters/MessageFilter";

export default interface SearchPagesInterface {
  searchTopics(filter: TopicFilter): Page[]

  searchMessages(filter: MessageFilter): PageMessage[]
}
