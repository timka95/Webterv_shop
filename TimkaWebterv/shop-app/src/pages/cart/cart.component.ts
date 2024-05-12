import { ShipItem } from './../../interfaces/ship-item';
import { UploadShippingDialogComponent } from './../../dialogs/upload-shipping-dialog/upload-shipping-dialog.component';
import { EditShippingDialogComponent } from './../../dialogs/edit-shipping-dialog/edit-shipping-dialog.component';
import { Component, Input } from '@angular/core';
import { Item } from '../../interfaces/item';
import { ItemService } from '../../services/item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from '../../interfaces/cart';
import { MatIconModule } from '@angular/material/icon';
import { DatabaseService } from '../../services/database.service';
import { MatDialog } from '@angular/material/dialog';
import { EditItemDialogComponent } from '../../dialogs/edit-item-dialog/edit-item-dialog.component';
import { MatButton } from '@angular/material/button';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButton, FormsModule, MatInputModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  items: { item: Item, quantity: number }[] = [];
  cart!: Cart;
  items_2: Item[] = [];
  currentdate = new Date()

  constructor(private itemService: ItemService, private databaseService: DatabaseService, private route: ActivatedRoute, private dialog: MatDialog, private router: Router) { }

  async ngOnInit() {
    this.itemService.cartObs.subscribe(cart => {
      this.cart = cart;
      this.items = []; // Clear the items array before reassigning

      this.cart.items.forEach(itemElement => {
        this.items.push(itemElement);
      });
    });
  }

  backToShop() {
    this.router.navigateByUrl("/shop");
  }

  updateQuantity(itemObj: { item: Item; quantity: number; }): void {
    // Ensure quantity is a positive integer
    if (itemObj.quantity < 0 || !Number.isInteger(itemObj.quantity)) {
      // Reset quantity to 1 if it's negative or not an integer
      itemObj.quantity = 1;
    }
    // You can put any additional validation or logic here
  }

  removeItem(item: Item) {
    const index = this.cart.items.findIndex(cartItem => cartItem.item === item);
    if (index !== -1) {
      this.cart.items.splice(index, 1);
      this.itemService.cart.next(this.cart);
    }
  }

  async uploadNewShippingItem(items: { item: Item, quantity: number }[]) {

    
    for (const uploadableItem of items) {
      const uploadable: ShipItem = {
        id: 0,
        item_ID: uploadableItem.item.id,
        status: "Bought",
        date: this.currentdate, // Example date, you can use any valid Date object here
        buyer_email: this.databaseService.auth.currentUser?.email?.toString() || "example@example.com", // Use default value if email is undefined
        amount: uploadableItem.quantity
      };
      
      await this.databaseService.uploadShipItem(uploadable);
    }
  
    // Remove the items after uploading
    items.forEach(item => {
      this.removeItem(item.item);
    });
  }

  formatDate(date: Date): string {
    // Perform date formatting here
    return date.toISOString(); // Example format, adjust as needed
  }
  



  refreshItemList() {
    // Fetch items from the service when the component initializes
    this.itemService.getItems().then(items => this.items_2 = items);
  }

}
