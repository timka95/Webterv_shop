import { Component, Input } from '@angular/core';
import { Item } from '../../../interfaces/item';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule, MatButton, FormsModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
  @Input() items!: Item[];
  
  constructor(private router: Router) {

  }

  selectItem(item: Item){

    // 1st option
    // Navigate to the shop-items route with the selected item as a query parameter
    this.router.navigate(['/shop-item'], { queryParams: { id: item.id } });

    // 2nd option shared service, he subscribes
  }

}
