import { Component, Input } from '@angular/core';
import { Item } from '../../../interfaces/item';
import { MatButton } from '@angular/material/button';
import { ItemService } from '../../../services/item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Cart } from '../../../interfaces/cart';
import { GuestGuard } from '../../../guards/guest-guard';

@Component({
  selector: 'app-specific-item',
  standalone: true,
  imports: [MatButton, CommonModule],
  templateUrl: './specific-item.component.html',
  styleUrl: './specific-item.component.scss'
})
export class SpecificItemComponent {
  @Input() item!: Item;
  cart!: Cart;

  constructor(private itemService: ItemService, private route: ActivatedRoute, private router: Router, private guestGuard: GuestGuard) { }

  async ngOnInit() {
    this.itemService.cartObs.subscribe(cart => this.cart = cart);

    // Fetch items from the service when the component initializes
    await this.itemService.getItems().then(items => {
      // Retrieve the ID from the query parameter
      this.route.queryParams.subscribe(params => {
        const id = params['id']; // Assuming the parameter is named 'id'

        if(id){
          var foundItem = items.find(item => item.id === +id);
        }

        if(foundItem){
          this.item = foundItem;
        }
        else{
          this.item = this.itemService.getItemsDefault()[0];
        }
      });
    });
  }

  addToCart() {

    // ha nincs bejelentkezve akkor ne a carthoz adja
    if(this.guestGuard.canActivate()){
      this.router.navigate(['/login']);
      return;
    }

    this.cart.items.push({ item: this.item, quantity: 1 });
    this.itemService.cart.next(this.cart);
    this.router.navigate(['/cart']);
  }

  backToShop() {
    this.router.navigateByUrl("/shop");
  }
  
}
