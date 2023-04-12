import Stock from "./Stock";
import CreationObserverInterface from "./Observers/CreationObserverInterface";
import UpdatingObserverInterface from "./Observers/UpdatingObserverInterface";
import DeletingObserverInterface from "./Observers/DeletingObserverInterface";

export interface ObservableInterface {
  addCreationObserver(observer: CreationObserverInterface<Stock>)

  addUpdatingObserver(handler: UpdatingObserverInterface<Stock>)

  addDeletingObserver(handler: DeletingObserverInterface<Stock>)
}
