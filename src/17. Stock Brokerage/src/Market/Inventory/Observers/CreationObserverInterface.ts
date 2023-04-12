export default interface CreationObserverInterface<EventData> {
  notifyCreated(data: EventData)
}
