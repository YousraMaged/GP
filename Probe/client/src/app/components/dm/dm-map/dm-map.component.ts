import { Component, OnInit } from '@angular/core';
import { MapService } from '../../../services/map.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as leaflet from 'leaflet';

@Component({
  selector: 'app-dm-map',
  templateUrl: './dm-map.component.html',
  styleUrls: ['./dm-map.component.css']
})

export class DmMapComponent implements OnInit {

  url: string = '../../../../assets/html/test.html';
  urlSafe: SafeResourceUrl;
  isLoading: boolean;
  toggleBottomMenu: string;
  Result: any;
  zoom: any;
  min_lng: any;
  min_lat: any;
  max_lng: any;
  max_lat: any;
  feature = {};
  water = null;
  gas = null;
  telephone = null;
  electric = null;
  violations = null;
  violations_num = null;
  vio_details = null;
  parcelID = null;
  usage = null;
  b_num = null;
  public geoJsonLayer;
  public Map: any;
  public BaseMap: any;
  public Layer: any;
  public markerIcon = require('leaflet/dist/images/marker-icon.png');
  private defaultIcon = leaflet.icon({
    iconUrl: this.markerIcon,
    iconAnchor: [16, 32]
  });

  constructor(public mapService: MapService, public sanitizer: DomSanitizer) {
    this.isLoading = false;
    this.toggleBottomMenu = 'hide';
  }

  ngOnInit() {
    //this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    leaflet.Marker.prototype.options.icon = this.defaultIcon;
    this.Map = leaflet.map('map', { zoomControl: false }).setView([30.142833, 31.626871], 13);
    leaflet.control.zoom({
      position: 'topright'
    }).addTo(this.Map);
    this.BaseMap = leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.Map);
    this.zoom = this.Map.getZoom();
    this.Map.on('moveend', (e) => {
      console.log('this: ' + this.Map.getZoom());
      console.log(this.Map.getZoom());
      if (this.Map.getZoom() >= 16) {
        this.max_lng = this.Map.getBounds()._northEast.lng;
        this.min_lat = this.Map.getBounds()._southWest.lat;
        this.min_lng = this.Map.getBounds()._southWest.lng;
        this.max_lat = this.Map.getBounds()._northEast.lat;
        this.addGeoJSON(this.min_lng, this.min_lat, this.max_lng, this.max_lat);
      }
      else if (this.Map.getZoom() <= 15 && this.geoJsonLayer !== undefined && this.Map !== undefined) {
        this.Map.removeLayer(this.geoJsonLayer);
      }
    });
  }
  whenClicked(e) {
    console.log(e.target.feature);
    //this.toggleBottomMenu = 'show';
  }

  addGeoJSON(min_lng, min_lat, max_lng, max_lat) {
    let self = this;
    this.isLoading = true;

    this.mapService.getParcels(this.min_lng, this.min_lat, this.max_lng, this.max_lat).subscribe(res => {
      console.log(res);
      if (this.geoJsonLayer) {
        this.Map.removeLayer(this.geoJsonLayer);
      }
      console.log(res.json());
      this.Result = res.json();
      this.geoJsonLayer = leaflet.geoJSON(this.Result, {
        style: {
          "color": "#b4dbc0",
          "strokeWidth": 6,
          "fillOpacity": 0.4
        },
        onEachFeature: (feature, layer) => {
          this.parcelID = Boolean(feature.properties.Id) ? feature.properties.Id : Math.floor((Math.random() * 280) + 999);
          this.usage = Boolean(feature.properties.Usage) ? feature.properties.Usage : 'Residential';
          this.b_num = Boolean(feature.properties.S_ID) ? feature.properties.S_ID : this.makeid().toUpperCase();
          this.gas = this.uppercase((Boolean(feature.properties.Gas)).toString());
          this.water = this.uppercase((Boolean(feature.properties.Water)).toString());
          this.electric = this.uppercase((Boolean(feature.properties.Electric)).toString());
          this.telephone = this.uppercase((Boolean(feature.properties.Telephone)).toString());
          this.violations_num = (Boolean(feature.properties.Violations)) ? 1 : 0;
          this.violations = (Boolean(feature.properties.Violations)) ? feature.properties.Violations : 'N/A';
          this.vio_details = Boolean(feature.properties.Vio_Type) ? feature.properties.Vio_Type : 'N/A';

          layer.bindPopup(`
          <div style="max-height:350px; width:250px;overflow-y: scroll"  gr-my-popup >
          <h5> Parcel ID: ${this.parcelID}</h5>
          <hr>
          <p>Landuse: ${this.usage}</p>
          <p>Building Number: ${this.b_num}</p>
          <hr>          
          <div>
            <h6><b>Available Utilities: </b></h6>
            <p *ngIf="water">Water: ${this.water}</p>
            <p>Gas: ${this.gas}</p>
            <p>Electric: ${this.electric}</p>
            <p>Telephone: ${this.telephone}</p>
          </div>
          <hr>
          <h6><b>Violations:</b></h6>
            <p>Count: ${this.violations_num}</p>
            <p>Violation Type: ${this.violations}</p>
            <p>Violation Information: ${this.vio_details}</p>
          </div>
          `, { autoPan: false });
          layer.on({
            click: (e) => { self.whenClicked(e) }
          });
        }
      }).addTo(this.Map);
    }, err => err, () => { this.isLoading = false; });

  }

  closeBottomMenu() {
    this.toggleBottomMenu = 'hide';
  }

  uppercase(str) {
    var array1 = str.split(' ');
    var newarray1 = [];

    for (var x = 0; x < array1.length; x++) {
      newarray1.push(array1[x].charAt(0).toUpperCase() + array1[x].slice(1));
    }
    return newarray1.join(' ');
  }

  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

  search(e){
    let keyword = `'${e.target.value}%25'`;
    let result;
    this.mapService.searchParcel(keyword).subscribe(res => {
      result = (res.json());
      console.log(result);
      let x = leaflet.geoJSON(result,
        {
        onEachFeature: (feature, layer) => {
          let popup = feature.properties.S_ID;
            layer.bindPopup(`Building ${popup}`);
        }
      }).addTo(this.Map);
      if (result !== undefined){
        console.log(x);
        // this.Map.fitBounds(x.getBounds());
      }
    })
  }

}
