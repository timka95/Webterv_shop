import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserCredential } from 'firebase/auth';
import { Observable } from 'rxjs';
import { DatabaseService } from '../services/database.service';


@Injectable({
    providedIn: 'root'
})
export class UserGuard implements CanActivate{

    constructor(private databaseService: DatabaseService) { }

    canActivate(){
        if (this.databaseService.auth.currentUser) {
            return true;
        }
        return false;
    }

}