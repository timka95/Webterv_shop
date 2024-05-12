import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import { Item } from '../../interfaces/item';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-upload-item-dialog',
  standalone: true,
  imports: [MatDialogClose, FormsModule, MatFormFieldModule, MatInput, MatButton, MatLabel],
  templateUrl: './upload-item-dialog.component.html',
  styleUrl: './upload-item-dialog.component.scss'
})
export class UploadItemDialogComponent {
  newItem: Item = {
    id: 0, // Assigning an empty string as id, it will be generated automatically by Firestore
    name: '',
    description: '',
    price: 0,
    discountPercent: 0,
    amount: 0,
    picture: '/assets/pictures/duck.jpg'
  };

  constructor(
    public dialogRef: MatDialogRef<UploadItemDialogComponent>,
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
