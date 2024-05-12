import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import { Item } from '../../interfaces/item';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { ShipItem } from '../../interfaces/ship-item';


@Component({
  selector: 'app-upload-shipping-dialog',
  standalone: true,
  imports:  [MatDialogClose, FormsModule, MatFormFieldModule, MatInput, MatButton, MatLabel],
  templateUrl: './upload-shipping-dialog.component.html',
  styleUrl: './upload-shipping-dialog.component.scss'
})
export class UploadShippingDialogComponent {

  newItem: ShipItem = {
    id: 0, // Assigning an empty string as id, it will be generated automatically by Firestore
    item_ID: 1,
    status: "",
    date: new Date("2024-05-12"),
    buyer_email: "",
    amount:0,
  };

  formatDate(date: Date): string {
    // Perform date formatting here
    return date.toISOString(); // Example format, adjust as needed
  }
  

  constructor(
    public dialogRef: MatDialogRef<UploadShippingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  upload(): void {
    // Pass the new item back to the parent component
    this.dialogRef.close(this.newItem);
  }
}



