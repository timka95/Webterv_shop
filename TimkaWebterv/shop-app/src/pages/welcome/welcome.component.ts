import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserGuard } from '../../guards/user-guard';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  // styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private userGuard: UserGuard, private router: Router) { }

  ngOnInit(): void {
    if (this.userGuard.canActivate()) {
      this.router.navigateByUrl('/shop'); // Redirect to shop page if logged in
    } else {
      this.router.navigateByUrl('/login'); // Redirect to login page if not logged in
    }
  }
}
