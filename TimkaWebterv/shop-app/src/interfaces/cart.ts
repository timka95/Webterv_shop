import { Item } from "./item";

export interface Cart {
    items: { item: Item, quantity: number }[]; // Array of items with their corresponding quantities
}
