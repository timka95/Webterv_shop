import { Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { ItemListerComponent } from '../pages/item-lister/item-lister.component';
import { AdminItemsComponent } from '../pages/admin-items/admin-items.component';
import { AdminGuard } from '../guards/admin-guard';
import { UserGuard } from '../guards/user-guard';
import { GuestGuard } from '../guards/guest-guard';
import { SpecificItemComponent } from '../pages/item-lister/specific-item/specific-item.component';
import { CartComponent } from '../pages/cart/cart.component';
import { TestyComponent } from '../pages/testy/testy.component';
import { ShippingComponent } from '../pages/shipping/shipping.component';

export const routes: Routes = [
    { path: '', redirectTo: '/shop', pathMatch: 'full' }, 
    { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
    { path: 'shipping', component: ShippingComponent, canActivate: [AdminGuard] },
    { path: 'admin-items', component: AdminItemsComponent, canActivate: [AdminGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
    { path: 'shop', component: ItemListerComponent},
    { path: 'shop-item', component: SpecificItemComponent},
    { path: 'cart', component: CartComponent, canActivate: [UserGuard]},
];
