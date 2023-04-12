export default interface UpdatingObserverInterface<EventData> {
  notifyUpdated(data: EventData)
}
