import {Item} from "./item";

export interface CartState {
  loaded: boolean;
  products : Item[];

}
