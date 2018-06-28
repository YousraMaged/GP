import { Injectable, OnDestroy } from "@angular/core";
import { Http } from "@angular/http";
import { Router } from "@angular/router";
import "rxjs/add/operator/map";
import { Subject } from "rxjs/Subject";

@Injectable()
export class RequestService {
  constructor(
      public http: Http, 
      public router: Router
    ) {}

    getRequests(){
      return this.http.get('http://localhost:3000/api/Requests')
      .map(res => res);
    }

    addRequest(request){
        return this.http.post('http://localhost:3000/api/Requests', request)
        .map(res => {
          res;
        });
      }

    searchRequest(number){
      return this.http.get('http://localhost:3000/api/Requests/getRequestByNumber?Number='+number)
      .map(res => {
        return res;
      })
    }
}
