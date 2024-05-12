import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import { Item } from '../../interfaces/item';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { ShipItem } from '../../interfaces/ship-item';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-edit-shipping-dialog',
  standalone: true,
  imports: [MatDialogClose, FormsModule, MatFormFieldModule, MatInput, MatButton, MatLabel, MatSelectModule],
  templateUrl: './edit-shipping-dialog.component.html',
  styleUrl: './edit-shipping-dialog.component.scss'
})
export class EditShippingDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditShippingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ShipItem
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveChanges(updatedItem: ShipItem) {
    // Pass the updated item back to the parent component
    this.dialogRef.close(updatedItem);
  }
}
