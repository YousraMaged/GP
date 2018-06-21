import { Injectable, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

    constructor(
        public http: Http,
        public router: Router
    ) {
    }

    login(user) {
        return this.http.post('http://localhost:3000/api/Clients/login', user)
            .map(res => {
                let result = res.json();
                if (result && result.id) {
                    localStorage.setItem('token', result.id);
                    localStorage.setItem('userID', result.userId);
                    return true;
                }
                return false;
            });
    }

    isLoggedIn() {
        if (localStorage.getItem('userID') !== null) {
            return true;
        }
        return false;
    }

    logout() {
        if (localStorage.getItem('token') !== null) {
            return this.http.post('http://localhost:3000/api/Users/logout?access_token=' + localStorage.getItem('token'), localStorage.getItem('token'))
                .map(res => {
                    localStorage.clear();
                });
        } else {
            this.router.navigate(['/login']);
        }
}

    resigter(user) {
        return this.http.post('http://localhost:3000/api/Clients', user)
            .map(res => {
                res.json();
            })
    }

    getRole(id) {
        return this.http.get('http://localhost:3000/api/Clients/getRole?id=' + localStorage.getItem('userID'))
            .map(res => {
                return res.json();
            })
    }

    isEmployee() {
        if (localStorage.getItem('role') === 'Employee'.toLowerCase()) {
            return true;
        }
        return false;
    }

    getLoggedInUser() {
        if (localStorage.getItem('userID') !== null){
            return this.http.get('http://localhost:3000/api/Clients/'+ localStorage.getItem('userID') +'?access_token=' + localStorage.getItem('token'))
            .map(res => {
                return res.json();
            })
        }
    }
}
