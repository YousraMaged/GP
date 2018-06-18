import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { AuthService } from '../services/auth.service'
@Injectable()
export class EmpGuard implements CanActivate {
    constructor(
        private router: Router,
        public authService:AuthService
    ){}

    canActivate(){
        let authenticated = this.authService.isEmployee();
        if (!authenticated){
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}
