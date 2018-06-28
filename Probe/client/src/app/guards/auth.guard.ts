import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service'
import 'rxjs/add/operator/map';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        public authService:AuthService
    ){}

    canActivate(route, state: RouterStateSnapshot){
        let authenticated = this.authService.isLoggedIn();
        if (!authenticated){
            this.router.navigate(['login'],{ queryParams: { returnUrl: state.url }});
            return false;
        }
        return true;
    }
}
