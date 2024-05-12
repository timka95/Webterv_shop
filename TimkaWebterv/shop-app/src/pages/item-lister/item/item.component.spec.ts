import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../../interfaces/item';

@Component({
  selector: 'app-specific-item',
  templateUrl: './specific-item.component.html',
  styleUrls: ['./specific-item.component.scss']
})
export class SpecificItemComponent implements OnInit {
  @Input() item!: Item;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Retrieve the first query parameter from the route
    // const itemId = this.route.snapshot.queryParamMap.get('id');
    // if (itemId) {
    //   // Now you can use the item ID to fetch the item from your database or wherever it's stored
    //   this.item = this.getItemById(itemId);
    // }
  }

  selectItem(item: Item) {
    this.router.navigateByUrl("/shop-items/" + item);
  }
}
