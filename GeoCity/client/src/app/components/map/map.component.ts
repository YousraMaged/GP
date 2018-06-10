import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import * as leaflet from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  Result: any;
  public Map: any;
  public BaseMap: any;
  public Layer:any;

  constructor(public mapService:MapService) { 

    console.log("Const");
    this.mapService.getResult().subscribe(res => {
      console.log(res.json());
      this.Result = res.json();
      console.log(this.Result.features);
    });

  }

  ngOnInit() {
    console.log("init");
    this.Map = leaflet.map('map').setView([30.04, 31.23], 16);
    this.BaseMap = leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.Map);
    this.Layer = leaflet.geoJson(this.Result).addTo(this.Map);
  }

}
