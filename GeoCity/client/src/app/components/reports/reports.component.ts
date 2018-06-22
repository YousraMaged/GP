import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operator/map';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SlideAnimation } from '../../animations/SlideDownAnimation';
import { Report } from '../../interfaces/Report';
import { ReportsService } from '../../services/reports.service';
import { AuthService } from '../../services/auth.service';
import * as leaflet from 'leaflet';
import { User } from '../../interfaces/User';

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
  public marker = {};
  public hasReport: boolean;
  public reportsCount: number;

  constructor(
    public flashMessagesService: FlashMessagesService,
    public router: Router,
    public reportService: ReportsService,
    public authService: AuthService
  ) {
    this.report = {
      notify: false,
      Category: '',
      Description: null,
      clientId: null,
      email: null,
      Date: null,
      Location: {
        "lat": null,
        "lng": null
      },
      Number: null,
      clientName: null,
      status: 'Pending',
    }
  }

  ngOnInit() {
    leaflet.Marker.prototype.options.icon = this.defaultIcon;
    this.Map = leaflet.map('map').setView([30.142833, 31.626871], 13);
    this.BaseMap = leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.Map);
    this.Map.on('click', (e) => {
      this.report.Location.lat = e.latlng.lat;
      this.report.Location.lng = e.latlng.lng;

      if (this.marker != undefined) {
        this.Map.removeLayer(this.marker);
      }
      this.marker = leaflet.marker([e.latlng.lat, e.latlng.lng], { draggable: true }).addTo(this.Map);
    })

    this.authService.getLoggedInUser().subscribe(res => {
      this.report.clientName = res.name;
      this.report.email = res.email;
    });

    this.checkReports();
  }

  toggle_notify() {
    this.report.notify = !this.report.notify;
    //this.state = (this.state === 'hide' ? 'show' : 'hide');
  }

  submitReport({ value, valid }) {
    if (valid) {
      this.report.clientId = localStorage.getItem('userID');
      this.report.Date = new Date(Date.now());
      console.log(this.report);
      this.reportService.addReport(this.report).subscribe(res => res);
    }
    else {
      this.flashMessagesService.show('Please enter valid information', { cssClass: 'alert-danger', timeout: 4000 });
      this.router.navigate(['report']);
    }
    window.location.reload();
  }

  checkReports() {
    this.reportService.getReportsCount().subscribe(res => {
      this.reportsCount = res.json().count;
      this.hasReport = true;
      if (this.reportsCount > 0) {
        this.reportService.getUserReports().subscribe(res => {
          return;
        })
      }
    });
  }

  
  test(){
    this.router.navigate([this.router.url]);
    
  }

}

