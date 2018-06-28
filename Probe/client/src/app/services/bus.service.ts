import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BusService {

    constructor(public http:Http){
    }

    getPath(origin, destination){
        return this.http.get('http://localhost:3000/api/Buses/path?origin='+origin+'&destination='+destination+'').map(res => res );
    }

    getRoute1(){
        return this.http.get('http://localhost:8080/geoserver/Geocity/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Geocity:route1Final&maxFeatures=50&outputFormat=application%2Fjson').map(res => res );
    }

    getStations1(){
        return this.http.get('http://localhost:8080/geoserver/Geocity/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Geocity:stations1&maxFeatures=50&outputFormat=application%2Fjson').map(res => res );
    }

    getRoute2(){
        return this.http.get('http://localhost:8080/geoserver/Geocity/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Geocity:route2&maxFeatures=50&outputFormat=application%2Fjson').map(res => res );
    }

    getStations2(){
        return this.http.get('http://localhost:8080/geoserver/Geocity/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Geocity:stations2&maxFeatures=50&outputFormat=application%2Fjson').map(res => res );
    }


}