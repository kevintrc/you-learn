import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()

export class LoggedAuthGaurd implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot,): boolean | Observable<boolean> | Promise<boolean> {
        const isAuth = this.authService.getauthStatus()
        if (isAuth) {
            this.router.navigate(['/public'])
        }
        return !isAuth;
    }
}