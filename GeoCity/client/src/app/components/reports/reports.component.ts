import { Component, OnInit } from '@angular/core';
import * as leaflet from 'leaflet';
import { map } from 'rxjs/operator/map';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  public Map: any;
  public BaseMap: any;
  public markerIcon = require('leaflet/dist/images/marker-icon.png');
  public markerShadow = require('leaflet/dist/images/marker-shadow.png');
  private defaultIcon = leaflet.icon({
    iconUrl: this.markerIcon,
    shadowUrl: this.markerShadow,
    iconAnchor: [13, 41]
  });
  notify: boolean = false;



  constructor() {
  }

  ngOnInit() {
    leaflet.Marker.prototype.options.icon = this.defaultIcon;
    this.Map = leaflet.map('map').setView([30.142833, 31.626871], 13);
    this.BaseMap = leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.Map);
    this.Map.on('click', (e) => {
      alert(e.latlng.lat + ", " + e.latlng.lng);
      leaflet.marker([e.latlng.lat, e.latlng.lng]).addTo(this.Map);
    })
  }

  toggle_notify() {
    this.notify = !this.notify;
  }

}
