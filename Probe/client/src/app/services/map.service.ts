import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MapService {

    constructor(public http: Http) {
    }

    getResult() {
        return this.http.get('http://localhost:8080/geoserver/Geocity/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Geocity:Polygon&outputFormat=application%2Fjson')
            .map(res => res);
    }

    getParcels(minLng, minLat, maxLng, maxLat) {
        // return this.http.get('http://localhost:8080/geoserver/Geocity/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Geocity:Polygon&outputFormat=application%2Fjson&bbox=31.59156965006559,30.109554110493928,31.61156965006559,30.209554110493928')
        // .map(res => res);
        return this.http.get('http://localhost:8080/geoserver/Geocity/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Geocity:Polygon&outputFormat=application%2Fjson&bbox=' + minLng + ',' + minLat + ',' + maxLng + ',' + maxLat)
            .map(res => res);
    }

    getByParcelId(parcelId) {
        return this.http.get('http://localhost:8080/geoserver/Geocity/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Geocity:ElShorook-Points&outputFormat=application%2Fjson&CQL_FILTER=Id=' + parcelId)
            .map(res => res);
    }

    getLine() {

        return this.http.get('http://localhost:8080/geoserver/Geocity/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Geocity:route1&outputFormat=application%2Fjson&CQL_FILTER=number=425')
            .map(res => res);
    }

    getStops() {

        return this.http.get('http://localhost:8080/geoserver/Geocity/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Geocity:stations1&outputFormat=application%2Fjson&CQL_FILTER=number=425').map(res => res);

    }

    searchParcel(keyword) {
        return this.http.get('http://localhost:8080/geoserver/Geocity/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Geocity:ElShorook-Points&outputFormat=application%2Fjson&CQL_FILTER=S_ID ' + 'LIKE ' + keyword).map(res => res);

    }

    getUserParcelinfo(NationalId) {
        return this.http.get('http://localhost:8080/geoserver/Geocity/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Geocity:ElShorook-Points&outputFormat=application%2Fjson&CQL_FILTER=NID=' + NationalId).map(res => res);
    }
    getServices() {
        return this.http.get(`http://localhost:8080/geoserver/Geocity/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Geocity:ElShorook-Points&outputFormat=application%2Fjson&CQL_FILTER=Services='T'`).map(res => res );
    }

    getOne(name){
        return this.http.get('http://localhost:8080/geoserver/Geocity/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Geocity:ElShorook-Points&outputFormat=application%2Fjson&CQL_FILTER=S_ID'+'LIKE'+name).map(res => res );
    }

}

