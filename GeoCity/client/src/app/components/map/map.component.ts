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
  public Layer: any;

  constructor(public mapService:MapService) { 
  }

  ngOnInit() {
    this.Map = leaflet.map('map').setView([30.142833, 31.626871], 13);
    this.BaseMap = leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.Map);
    this.addGeoJSON();
    console.log(this.Result);
  }

  addGeoJSON()
  {
    this.mapService.getResult().subscribe(res => {
      console.log(res.json());
      console.log('?!');
      this.Result = res.json();
      //console.log(this.Result.features);
      leaflet.geoJSON(this.Result).addTo(this.Map);
      
    }, err => console.log(err));

  }

}
