import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MapService {

    constructor(public http:Http){
    }

    getResult(){
        return this.http.get('http://localhost:8080/geoserver/Geocity/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Geocity:GIS_Cad_Data&maxFeatures=95000&outputFormat=application%2Fjson').map(res => res );
    }


}

