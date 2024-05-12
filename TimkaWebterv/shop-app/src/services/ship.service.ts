import { ShipItem } from './../interfaces/ship-item';
import { Injectable } from '@angular/core';
import { Item } from '../interfaces/item';
import { DatabaseService } from './database.service';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../interfaces/cart';


@Injectable({
  providedIn: 'root'
})
export class ShipService {

  constructor(private databaseService: DatabaseService) { }
  private shipItem!: ShipItem[];

  async getshipItem(): Promise<ShipItem[]> {
    // this.databaseService.getshipItem().then(shipItem => this.shipItem = shipItem);
    await this.databaseService.getshipItem()
    .then(shipItem => {
      this.shipItem = [];
      shipItem.forEach((currentItem, index) => {
        this.shipItem.push({
          id: currentItem['id'],
          item_ID: currentItem['item_ID'],
          status: currentItem['status'],
          date: currentItem['date'],
          buyer_email: currentItem['buyer_email'],
          amount: currentItem['amount'],
        });
      });
    });
  
    // this.setshipItemDefault();
    return this.shipItem;
  }
}
