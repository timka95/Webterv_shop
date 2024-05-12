import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserCredential } from 'firebase/auth';
import { Observable } from 'rxjs';
import { DatabaseService } from '../services/database.service';


@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(private databaseService: DatabaseService) { }

    canActivate() {
        if (this.databaseService.auth.currentUser && this.databaseService.auth.currentUser.email === "admin@admin.com") {
            return true;
        }
        return false;
    }
}