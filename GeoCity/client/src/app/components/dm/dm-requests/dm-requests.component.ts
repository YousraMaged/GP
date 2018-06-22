import { Component, OnInit } from '@angular/core';
import * as leaflet from 'leaflet';

@Component({
  selector: 'app-dm-requests',
  templateUrl: './dm-requests.component.html',
  styleUrls: ['./dm-requests.component.css']
})
export class DmRequestsComponent implements OnInit {

  public Map: any;
  public BaseMap: any;
  public Layer: any;

  constructor() { }

  ngOnInit() {
    this.Map = leaflet.map('map').setView([30.142833, 31.626871], 13);
    this.BaseMap = leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.Map);
  }

}
