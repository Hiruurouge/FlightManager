import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import  {UService} from "../../Services/u.service";
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private uService: UService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Check if the user has an admin status
    if (this.uService.user && this.uService.user.status === 'admin') {
      return true;
    }

    // If the user is not an admin, redirect to the login page
    return this.uService.redirectToLogin();
  }
}
