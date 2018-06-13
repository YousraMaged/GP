import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MapService {

    constructor(public http:Http){
    }

    getResult(){
        return this.http.get('../../assets/map.geojson').map(res => res );
    }


}

