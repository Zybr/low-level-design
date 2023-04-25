import Page from "./Page";
import PagesFilter from "./PagesFilter";
import User from "../Auth/Users/User";

export default class PagesCatalog {
  private readonly pages = new Set<Page>();

  public search(filter: PagesFilter = null): Page[] {
    if (!filter) {
      return this.getPages();
    }

    return this.getPages()
      .filter(page => {
        if (filter.getTitleKeyword() && !page.getTitle().includes(filter.getTitleKeyword())) {
          return false;
        }

        if (filter.getTextKeyword() && !page.getText().includes(filter.getTextKeyword())) {
          return false;
        }

        if (filter.getAuthors().size && !filter.getAuthors().has(page.getAuthor())) {
          return false;
        }

        return true;
      });
  }

  public createPage(author: User, title: string, text: string): Page {
    const page = new Page(author, title, text);
    this.pages.add(page);

    return page;
  }

  public removePage(page: Page) {
    this.pages.delete(page);
  }

  private getPages(): Page[] {
    return Array.from(this.pages);
  }
}
