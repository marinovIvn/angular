import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../auth/services/auth.service";

@Injectable ({
    providedIn: 'root'
})
export class AclGuard implements CanActivate{

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
       

        if (!this.authService.hasNotPermissions('user')) {
            this.router.navigate(['/main']);
            return false;
        }

        return true;
    }
}