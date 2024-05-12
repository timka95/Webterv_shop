import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import { Item } from '../../interfaces/item';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { ShipItem } from '../../interfaces/ship-item';
import { MatSelectModule } from '@angular/material/select';
import { Cart } from '../../interfaces/cart';

@Component({
  selector: 'app-edit-quantity-dialog',
  standalone: true,
  imports: [MatDialogClose, FormsModule, MatFormFieldModule, MatInput, MatButton, MatLabel, MatSelectModule],
  templateUrl: './edit-quantity-dialog.component.html',
  styleUrl: './edit-quantity-dialog.component.scss'
})
export class EditQuantityDialogComponent {

  items: { item: Item, quantity: number }[] = [];
  cart!: Cart;

  

}
