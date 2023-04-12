export default interface DeletingObserverInterface<EventData> {
  notifyDeleted(data: EventData)
}
