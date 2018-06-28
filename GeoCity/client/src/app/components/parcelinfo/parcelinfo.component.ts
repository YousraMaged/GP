import { Component, OnInit } from '@angular/core';
import * as leaflet from 'leaflet';
import { MapService } from '../../services/map.service';
import { AuthService } from '../../services//auth.service';

import { Http } from '@angular/http';
import { Response } from '@angular/http/src/static_response';

@Component({
  selector: 'app-parcelinfo',
  templateUrl: './parcelinfo.component.html',
  styleUrls: ['./parcelinfo.component.css']
})

export class ParcelinfoComponent implements OnInit {
  public toggleBottomMenu: string;
  public parcelinfo;
  isLoading: boolean;
  Result: any;
  NationalId: Number;
  coordinates: any;
  public Map: any;
  public BaseMap: any;
  public Layer: any;
  public markerIcon = require('leaflet/dist/images/parcelinfo.png');
  public markerShadow = require('leaflet/dist/images/marker-shadow.png');
  private defaultIcon = leaflet.icon({
    iconUrl: this.markerIcon,
    iconShadow: this.markerShadow,
    iconAnchor: [32, 62]
  });


  constructor(

    public http: Http,
    public mapService: MapService,
    public authService: AuthService
  ) {
    this.toggleBottomMenu = 'hide';
    this.isLoading = true;
    this.parcelinfo = {
      ID:'',
      Usage: '',
      Vio_Type: '',
      Violations: '',
      Water: '',
      Gas:'',
      Electric:'',
      Telephone:'',
      License:''
    }

  }
  getUserParcelinfo() {
    if (localStorage.getItem('userID') !== null) {
      return this.http.get('http://localhost:3000/api/Clients/' + localStorage.getItem('userID') + '?access_token=' + localStorage.getItem('token'))
        .map(res => {
          console.log(res.json());
          return res.json();
        });
    }
  }

  ngOnInit() {
    leaflet.Marker.prototype.options.icon = this.defaultIcon;
    this.Map = leaflet.map('map').setView([30.142833, 31.626871], 13);
    this.BaseMap = leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.Map);
    this.getNationalID();

  }

  getNationalID() {
    this.authService.getNationalID().subscribe(res => {
      this.NationalId = res.nationalId.NationalID;
    }, err => err, () => this.addGeoJSON());
  }

  addGeoJSON() {

    this.mapService.getUserParcelinfo(this.NationalId).subscribe(res => {
      console.log(res.json());
      this.Result = res.json();
      this.coordinates = this.Result.features[0].geometry.coordinates;
      this.Map.setView(new leaflet.LatLng(this.coordinates[1], this.coordinates[0]), 22);
      console.log();
      let self = this;
      leaflet.geoJSON(this.Result, {
        onEachFeature: (feature, layer) => {
          layer.on('click', function (e) {
            self.toggleBottomMenu = 'show';
          })
        }
      }).addTo(this.Map);
      this.parcelinfo = res.json();
    }, err => console.log(err),
      () => {
        this.parcelinfo.ID = Boolean(this.Result.features[0].properties.Id);
        this.parcelinfo.NID = this.Result.features[0].properties.NID;
        this.parcelinfo.Usage = this.Result.features[0].properties.Usage;
        this.parcelinfo.Vio_Type = this.Result.features[0].properties.Vio_Type;
        this.parcelinfo.Violations = this.Result.features[0].properties.Violations;
        this.parcelinfo.Water = Boolean(this.Result.features[0].properties.Water);
        this.parcelinfo.Gas = Boolean(this.Result.features[0].properties.Gas);
        this.parcelinfo.Telephone = Boolean(this.Result.features[0].properties.Telephone);
        this.parcelinfo.Electric = Boolean(this.Result.features[0].properties.Electric);
        this.parcelinfo.License = Boolean(this.Result.features[0].properties.License);
        this.isLoading = false;
      });


  }

  


  closeBottomMenu() {
    this.toggleBottomMenu = 'hide';
  }

}