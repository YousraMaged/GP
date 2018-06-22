import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../services/reports.service';
import { Report } from '../../../interfaces/Report';
import * as leaflet from 'leaflet';

@Component({
  selector: 'app-dm-reports',
  templateUrl: './dm-reports.component.html',
  styleUrls: ['./dm-reports.component.css']
})
export class DmReportsComponent implements OnInit {

  public toggleBottomMenu: string;
  public Map: any;
  public BaseMap: any;
  public Reports: Array<Report>;
  public ReportInfo;
  public markerIcon = require('leaflet/dist/images/marker-icon.png');
  private defaultIcon = leaflet.icon({
    iconUrl: this.markerIcon,
    iconAnchor: [16, 32]
  });
  private SewageIcon = leaflet.icon({
    iconUrl: require(`leaflet/dist/images/Sewage.png`),
    iconAnchor: [16, 16], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -15] // point from which the popup should open relative to the iconAnchor
  });
  private ElectricityIcon = leaflet.icon({
    iconUrl: require(`leaflet/dist/images/Electricity.png`),
    iconAnchor: [16, 16], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -15] // point from which the popup should open relative to the iconAnchor
  });
  private RoadIcon = leaflet.icon({
    iconUrl: require(`leaflet/dist/images/Electricity.png`),
    iconAnchor: [16, 16], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -15] // point from which the popup should open relative to the iconAnchor
  });
  private WaterIcon = leaflet.icon({
    iconUrl: require(`leaflet/dist/images/Water.png`),
    iconAnchor: [16, 16], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -15] // point from which the popup should open relative to the iconAnchor
  });
  private TelephoneIcon = leaflet.icon({
    iconUrl: require(`leaflet/dist/images/Telephone.png`),
    iconAnchor: [16, 16], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -15] // point from which the popup should open relative to the iconAnchor
  });
  private GasIcon = leaflet.icon({
    iconUrl: require(`leaflet/dist/images/Gas.png`),
    iconAnchor: [16, 16], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -15] // point from which the popup should open relative to the iconAnchor
  });

  constructor(
    public reportsService: ReportsService
  ) {
    this.toggleBottomMenu = 'hide';
    this.Reports = [];
    this.ReportInfo = {
      category:'',
      userName:'',
      description:'',
      date:'',
      status:'Pending',
      Number: null,
    }
  }

  ngOnInit() {
    leaflet.Marker.prototype.options.icon = this.defaultIcon;
    this.Map = leaflet.map('map').setView([30.142833, 31.626871], 13);
    this.BaseMap = leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.Map);
    this.reportsService.getReports().subscribe(res => {
      this.Reports = res.json();
      console.log(this.Reports);
      for (let i = 0; i < this.Reports.length; i++) {
        let popup = leaflet.popup()
          .setContent(`<h2> ${this.Reports[i].Category} </h2>`);
        let icon;
        switch (this.Reports[i].Category) {
          case 'Sewage':
            icon = this.SewageIcon;
            break;
          case 'Electricity':
            icon = this.ElectricityIcon;
            break;
          case 'Road':
            icon = this.RoadIcon;
            break;
          case 'Water':
            icon = this.WaterIcon;
            break;
          case 'Telephone':
            icon = this.TelephoneIcon;
            break;
          case 'Gas':
            icon = this.GasIcon;
            break;
          default:
            icon = this.defaultIcon;
            break;
        }
        leaflet.marker([this.Reports[i].Location.lat, this.Reports[i].Location.lng])
          .addTo(this.Map).setIcon(icon).on('click', () => {
            this.toggleBottomMenu = 'show';
            this.ReportInfo.category = this.Reports[i].Category;
            this.ReportInfo.description = this.Reports[i].Description;
            this.ReportInfo.date = this.Reports[i].Date;
            this.ReportInfo.clientName = this.Reports[i].clientName;
            this.ReportInfo.Number = this.Reports[i].Number;
          });
          
      }
    });
  }

  closeBottomMenu(){
    this.toggleBottomMenu = 'hide';
  }

}
