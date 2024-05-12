import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { UserGuard } from '../../guards/user-guard';
import { GuestGuard } from '../../guards/guest-guard';
import { AdminGuard } from '../../guards/admin-guard';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, MatIcon],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private databaseService: DatabaseService, private userGuard: UserGuard, private adminGuard: AdminGuard, private guestGuard: GuestGuard) {

  }

  logOut() {
    this.databaseService.signUserOut();
  }

  isAdmin() {
    return this.adminGuard.canActivate();
  }

  isGuest() {
    return this.guestGuard.canActivate();
  }

  isUser() {
    return this.userGuard.canActivate();
  }
}
