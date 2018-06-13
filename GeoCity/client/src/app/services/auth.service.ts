import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

    constructor(public http: Http) {
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

    logout(){
        return this.http.post('http://localhost:3000/api/Users/logout?access_token=' + localStorage.getItem('token'),localStorage.getItem('token'))
        .map(res => {
            localStorage.clear();
        });
    }

    resigter(user){
        return this.http.post('http://localhost:3000/api/Clients',user)
        .map(res => {
            res.json();
            console.log(res.json());
        })
    }


}

