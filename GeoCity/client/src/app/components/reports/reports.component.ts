import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as leaflet from 'leaflet';
import { map } from 'rxjs/operator/map';
import { SlideAnimation } from '../../animations/SlideDownAnimation';
import { Report } from '../../interfaces/Report';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  animations: [SlideAnimation]
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
  public report: Report;

  constructor(
    public flashMessagesService:FlashMessagesService,
    public router: Router
  ) {
    this.report = {
      notify: false,
      category: '0',
      description: null,
      clientId: null,
      email: null,
      date: null,
      location: {
          "lat": null,
          "lng": null
      }
  }
  
  }

  ngOnInit() {
    leaflet.Marker.prototype.options.icon = this.defaultIcon;
    this.Map = leaflet.map('map').setView([30.142833, 31.626871], 13);
    this.BaseMap = leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.Map);
    this.Map.on('click', (e) => {
      //alert(e.latlng);
      //leaflet.markers.clearLayers();
      leaflet.marker([e.latlng.lat, e.latlng.lng]).addTo(this.Map);
      this.report.location.lat = e.latlng.lat;
      this.report.location.lng = e.latlng.lng;
      
    })
  }

  toggle_notify() {
    this.report.notify = !this.report.notify;
    //this.state = (this.state === 'hide' ? 'show' : 'hide');
  }

  submitReport({ value, valid }) {
    if (valid) {
      this.report.clientId = localStorage.getItem('userID');
      this.report.date = new Date(Date.now());
      switch (this.report.category) {
        case "1":
          this.report.category = "Sewage";
          break;
        case "2":
          this.report.category = "Electricity";
          break;
        case "3":
          this.report.category = "Telephone";
          break;
        case "4":
          this.report.category = "Road";
          break;
        case "5":
          this.report.category = "Water";
          break;
        case "6":
          this.report.category = "Gas";
          break;
        default:
          this.report.category = null;
      }
      console.log(this.report);
    }
    else{
      this.flashMessagesService.show('Please enter valid information', {cssClass:'alert-danger', timeout: 4000});
      this.router.navigate(['report']);
    }
  }



}
