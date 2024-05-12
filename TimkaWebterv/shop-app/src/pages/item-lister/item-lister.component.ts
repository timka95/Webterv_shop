import { Component } from '@angular/core';
import { ItemComponent } from './item/item.component';
import { Item } from '../../interfaces/item';
import { ItemService } from '../../services/item.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-item-lister',
  standalone: true,
  imports: [ItemComponent, FormsModule, MatFormFieldModule, MatLabel, MatInputModule],
  templateUrl: './item-lister.component.html',
  styleUrl: './item-lister.component.scss'
})
export class ItemListerComponent {
  items: Item[] = [];
  filteredItems: Item[] = [];
  filterTerm: string = '';

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    // Fetch items from the service when the component initializes
    this.itemService.getItems().then(items => {
      this.items = items;
      this.applyFilter();
    });
  }

  applyFilter(): void {
    if (!this.items) return;
    if (!this.filterTerm.trim()) {
      this.filteredItems = this.items;
    } else {
      this.filteredItems = this.items.filter(item =>
        item.name.toLowerCase().includes(this.filterTerm.trim().toLowerCase())
      );
    }
  }
}
