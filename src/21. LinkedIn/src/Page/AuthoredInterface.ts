import User from "../Auth/Users/User";

export default interface AuthoredInterface {
  getAuthor(): User;
}
