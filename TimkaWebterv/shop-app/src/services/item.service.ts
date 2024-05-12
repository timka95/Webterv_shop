import { Injectable } from '@angular/core';
import { Item } from '../interfaces/item';
import { DatabaseService } from './database.service';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  cart = new BehaviorSubject<Cart>( {items: []});
  cartObs = this.cart.asObservable();
  
  constructor(private databaseService: DatabaseService) { }

  private items!: Item[];

  async getItems(): Promise<Item[]> {
    // this.databaseService.getItems().then(items => this.items = items);
    await this.databaseService.getItems()
    .then(items => {
      this.items = [];
      items.forEach((currentItem, index) => {
        this.items.push({
          id: currentItem['id'], // Use the actual ID from the item
          name: currentItem['name'], 
          // If currentItem['picture'] or ID the duck
          //picture: 'assets/pictures/duck.jpg',
          picture: currentItem['picture'] || '/assets/pictures/duck.jpg',
          //picture: currentItem['picture'],
          price: currentItem['discountPercent'] !== 0 ? currentItem['price'] - (currentItem['price'] * (currentItem['discountPercent']/100)): currentItem['price'],
          description: currentItem['description'],
          amount: currentItem['amount'],
          discountPercent: currentItem['discountPercent']
        });
      });
    });
  
    // this.setItemsDefault();
    return this.items;
  }

  getItemsDefault() {
    return [
      { id: 1, name: 'Item 1', picture: 'assets/pictures/duck.jpg', price: 10 },
      { id: 2, name: 'Item 2', picture: 'assets/pictures/duck.jpg', price: 15 },
      { id: 3, name: 'Item 3', picture: 'assets/pictures/duck.jpg', price: 20 },
      { id: 4, name: 'Item 4', picture: 'assets/pictures/duck.jpg', price: 25 },
      { id: 5, name: 'Item 5', picture: 'assets/pictures/duck.jpg', price: 30 },
    ];
  }
}
