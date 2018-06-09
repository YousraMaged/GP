import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MapService {

    constructor(public http:Http){
    }

    getResult(){
        return this.http.get('http://localhost:8080/geoserver/earth/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=earth:countries&maxFeatures=50&outputFormat=application%2Fjson').map(res => res );
    }


}

