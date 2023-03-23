import Category from "./Product/Category";

export default interface SearchFilter {
  name?: string,
  categories?: Category[]
}
