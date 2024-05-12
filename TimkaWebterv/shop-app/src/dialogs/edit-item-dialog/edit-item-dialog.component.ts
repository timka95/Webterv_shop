import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import { Item } from '../../interfaces/item';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-edit-item-dialog',
  standalone: true,
  imports: [MatDialogClose, FormsModule, MatFormFieldModule, MatInput, MatButton, MatLabel],
  templateUrl: './edit-item-dialog.component.html',
  styleUrl: './edit-item-dialog.component.scss'
})
export class EditItemDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EditItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveChanges(updatedItem: Item) {
    // Pass the updated item back to the parent component
    this.dialogRef.close(updatedItem);
  }
}