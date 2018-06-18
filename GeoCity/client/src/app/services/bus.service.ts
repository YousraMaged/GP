import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BusService {

    constructor(public http:Http){
    }

    getpath(origin, destination){
        return this.http.get('http://localhost:3000/api/Buses/path?origin='+origin+'&destination='+destination+'').map(res => res );
    }


}