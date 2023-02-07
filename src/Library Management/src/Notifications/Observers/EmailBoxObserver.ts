import AbstractNotificationObserver from "./AbstractNotificationObserver";

export default class EmailBoxObserver extends AbstractNotificationObserver{
  public constructor(
    private readonly email: string
  ) {
    super();
  }
}
