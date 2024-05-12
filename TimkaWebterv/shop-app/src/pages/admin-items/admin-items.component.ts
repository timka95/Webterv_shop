import { Component } from '@angular/core';
import { Item } from '../../interfaces/item';
import { ItemService } from '../../services/item.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DatabaseService } from '../../services/database.service';
import { MatDialog } from '@angular/material/dialog';
import { EditItemDialogComponent } from '../../dialogs/edit-item-dialog/edit-item-dialog.component';
import { MatButton } from '@angular/material/button';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { UploadItemDialogComponent } from '../../dialogs/upload-item-dialog/upload-item-dialog.component';

@Component({
  selector: 'app-admin-items',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButton],
  templateUrl: './admin-items.component.html',
  styleUrl: './admin-items.component.scss'
})
export class AdminItemsComponent {
  items: Item[] = [];

  constructor(private itemService: ItemService, private databaseService: DatabaseService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.refreshItemList();
  }

  refreshItemList() {
    // Fetch items from the service when the component initializes
    this.itemService.getItems().then(items => this.items = items);
  }

  // Upload a new item
  uploadNewItem() {
    const dialogRef = this.dialog.open(UploadItemDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(newItem => {
      if (newItem) {
        this.databaseService.uploadItem(newItem).then(() => {
          // Refresh the item list after uploading the item
          this.refreshItemList();
        });
      }
    });
  }

  // Modify an existing item
  editItem(item: Item) {
    const dialogRef = this.dialog.open(EditItemDialogComponent, {
      width: '400px',
      data: { ...item } // Pass a copy of the item data to prevent modifying the original item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.databaseService.modifyItem(result).then(() => {
          // Refresh the item list after modifying the item
          this.refreshItemList();
        });
      }
    });
  }

  // Delete an existing item
  deleteItem(item: Item) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      height: '200px',
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.databaseService.deleteItem((item.id).toString()).then(() => {
          // Refresh the item list after deleting the item
          this.refreshItemList();
        });
      }
    });
  }
}
