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
  animations: [SlideAnimation],
  
})
export class ReportsComponent implements OnInit {
  p: number = 1;
  public Map: any;
  public BaseMap: any;
  public Reports: Array<Report>;
  public ReportInfo;
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
  //   for (let i = 0; i <= this.Reports.length; i++){
  //     this.Reports.push(ReportsService.arguments);
  // }
    this.Reports = [];
    this.ReportInfo = {
      category:'',
      userName:'',
      description:'',
      date:'',
      status:'Pending',
      Number: null,
    },
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

    this.reportService.getUserReports().subscribe(res => {
      this.Reports = res.json();
      console.log(this.Reports);
      console.log(this.Reports.length);
      for (let i = 0; i < this.Reports.length; i++) {
        let popup = leaflet.popup()
          .setContent(`<h2> ${this.Reports[i].Category} </h2>`)
          this.ReportInfo.category = this.Reports[i].Category;
          this.ReportInfo.description = this.Reports[i].Description;
          this.ReportInfo.date = this.Reports[i].Date;
          this.ReportInfo.clientName = this.Reports[i].clientName;
          this.ReportInfo.Number = this.Reports[i].Number;
       
      }});

    this.checkReports();
   
      
  }
  toggle_notify() {
    this.report.notify = !this.report.notify;
    //this.state = (this.state === 'hide' ? 'show' : 'hide');
  }

  submitReport({ value, valid }) {
    if (valid && this.report.Location.lat !== null && this.report.Location.lng !== null) {
      this.report.clientId = localStorage.getItem('userID');
      this.report.Date = new Date(Date.now());
      this.report.Number = Math.floor((Math.random() * 1000000) + 9999999);
      console.log(this.report);
      this.reportService.addReport(this.report).subscribe(res => res);
      this.flashMessagesService.show('Complaint Submitted, We will keep you updated!', { cssClass: 'alert-success', timeout: 4000 });
      this.router.navigate(['/report']);
    }
    else {
      this.flashMessagesService.show('Please enter valid information', { cssClass: 'alert-danger', timeout: 4000 });
      this.router.navigate(['/report']);
    }
  }

  checkReports() {
    this.reportService.getReportsCount().subscribe(res => {
      this.reportsCount = res.json().count;
      if (this.reportsCount > 0) {
        this.reportService.getUserReports().subscribe(res => {
          this.hasReport = true;
          return true;
        })
      }
      console.log(this.reportsCount);
      return false;
    });
  }
}

