import ItemEnum from "../../Enums/ItemEnum";

export default interface AtmState {
  selectItem(item: ItemEnum);

  typeNumber(number: number);

  cancel();
}
