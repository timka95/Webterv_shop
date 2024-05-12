import { ShipItem } from './../../interfaces/ship-item';
import { Component } from '@angular/core';
import { Item } from '../../interfaces/item';
import { ItemService } from '../../services/item.service';
import { CommonModule, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DatabaseService } from '../../services/database.service';
import { MatDialog } from '@angular/material/dialog';
import { EditItemDialogComponent } from '../../dialogs/edit-item-dialog/edit-item-dialog.component';
import { MatButton } from '@angular/material/button';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { UploadItemDialogComponent } from '../../dialogs/upload-item-dialog/upload-item-dialog.component';
import { FormsModule } from '@angular/forms';
import { ShipService } from '../../services/ship.service';
import { EditShippingDialogComponent } from '../../dialogs/edit-shipping-dialog/edit-shipping-dialog.component';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { ItemComponent } from '../item-lister/item/item.component';
import { DatePipe } from '@angular/common';

import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-shipping',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButton, MatFormFieldModule, FormsModule, ItemComponent, MatLabel, MatInputModule],
  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.scss'
})
export class ShippingComponent {
  
  shippings: ShipItem[] = [];
  items: Item[] = [];
  combined: [ShipItem, Item][] = [];

  filteredItems: [ShipItem, Item][] = [];
  filterTerm: string = '';

 
  

  constructor(private itemService: ItemService, private shipService: ShipService, private databaseService: DatabaseService, private dialog: MatDialog) { }


  
  async ngOnInit() {

    // await this.itemService.getItems().then(items => {
    //   this.applyFilter();
    //   this.items = items;
    // });

    await this.refreshItemList();

  }

  async refreshItemList() {
    // Fetch items from the service when the component initializes
    await this.itemService.getItems().then(items => {
      this.items = items;
      this.shipService.getshipItem().then(shipitems => {
        this.shippings = shipitems;
        this.combineShippingWithItems();
        this.applyFilter();
      });
    });
    
  }

  combineShippingWithItems() {
    this.combined = [];
    this.shippings.forEach(shipping => {
      const correspondingItem = this.items.find(item => item.id === shipping.item_ID);
      if (correspondingItem) {
        this.combined.push([shipping, correspondingItem]);
      }
    });
  }

  applyFilter(): void {
    if (!this.combined) return;
    if (!this.filterTerm.trim()) {
      this.filteredItems = this.combined;
    } else {
      this.filteredItems = this.combined.filter(item =>
        item[0].status.toLowerCase().includes(this.filterTerm.trim().toLowerCase())
      );
    }
  }

  convertTimestampToDate(timestamp: { seconds: number, nanoseconds: number }): Date {
    // Assuming your timestamp has 'seconds' property
    return new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
  }

  convertDate(date: Date): string {

    const dateString = this.transformFirestoreTimestamp(date.toString());
    return dateString;
    // return datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  transformFirestoreTimestamp(timestampString: string): string {
    // Extract seconds and nanoseconds from the string
    const secondsMatch = timestampString.match(/seconds=(\d+)/);
    const nanosecondsMatch = timestampString.match(/nanoseconds=(\d+)/);
  
    if (secondsMatch && nanosecondsMatch) {
      // Parse seconds and nanoseconds
      const seconds = parseInt(secondsMatch[1], 10);
      const nanoseconds = parseInt(nanosecondsMatch[1], 10);
  
      // Create Date object using the extracted values
      const date = new Date(seconds * 1000 + nanoseconds / 1000000).toUTCString();
      return date.toString();
    } else {
      return "Invalid timestamp format";
    }
  }

  editshipItem(shippings: ShipItem) {
    const dialogRef = this.dialog.open(EditShippingDialogComponent, {
      width: '400px',
      data: { ...shippings } // Pass a copy of the item data to prevent modifying the original item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.databaseService.modifyShipping(result).then(() => {
          // Refresh the item list after modifying the item
          this.refreshItemList();
        });
      }
    });
  }

}


