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
  public isLoading: boolean;
  public Map: any;
  public BaseMap: any;
  public Reports: Array<Report>;
  public ReportInfo;
  public searchResult;
  public mapData;
  public searchData;
  public url;
  public searchActive: boolean;
  public inputValue: any;
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
  private SearchIcon = leaflet.icon({
    iconUrl: require(`leaflet/dist/images/search-icon.png`),
    iconAnchor: [32, 64], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -15] // point from which the popup should open relative to the iconAnchor
  });

  constructor(
    public reportsService: ReportsService
  ) {
    this.toggleBottomMenu = 'hide';
    this.Reports = [];
    this.mapData = [];
    this.inputValue = '';
    this.searchActive = false;
    this.ReportInfo = {
      category: '',
      userName: '',
      description: '',
      date: '',
      status: '',
      Number: null,
    }
    this.isLoading = true;
  }

  ngOnInit() {
    leaflet.Marker.prototype.options.icon = this.defaultIcon;
    this.Map = leaflet.map('map', { zoomControl: false }).setView([30.142833, 31.626871], 13);
    leaflet.control.zoom({
      position: 'topright'
    }).addTo(this.Map);
    this.BaseMap = leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.Map);
    this.showReports();
  }

  showReports() {
    this.reportsService.getReports().subscribe(res => {
      this.isLoading = true;
      this.Reports = res.json();
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
        this.mapData.push(leaflet.marker([this.Reports[i].Location.lat, this.Reports[i].Location.lng])
          .addTo(this.Map).setIcon(icon).on('click', () => {
            this.toggleBottomMenu = 'show';
            this.ReportInfo.category = this.Reports[i].Category;
            this.ReportInfo.description = this.Reports[i].Description;
            console.log(this.ReportInfo.description);
            this.ReportInfo.date = this.Reports[i].Date;
            this.ReportInfo.clientName = this.Reports[i].clientName;
            this.ReportInfo.Number = this.Reports[i].Number;
            this.ReportInfo.status = this.Reports[i].status;
          }));
      }
    }, err => err, () => {
        this.isLoading = false;
    });
  }


  removeMarkers() {
    for (let j = 0; j < this.mapData.length; j++) {
      this.Map.removeLayer(this.mapData[j]);
    }
  }

  closeBottomMenu() {
    this.toggleBottomMenu = 'hide';
  }

  search(e) {
    this.searchActive = true;
    this.toggleBottomMenu = 'hide';
    this.reportsService.searchReport(e.target.value).subscribe(res => {
      this.searchResult = res.json().Report[0];
      // this.url = window.location.href + '?number=' + this.searchResult.Number;
      // window.history.replaceState(null, null, this.url);
      let resultLocation = this.searchResult.Location;
      this.searchData = leaflet.marker([resultLocation.lat, resultLocation.lng], { icon: this.SearchIcon })
        .addTo(this.Map).on('click', () => {
          this.toggleBottomMenu = 'show';
          this.ReportInfo.Description = this.searchResult.Description;
          this.ReportInfo.Date = this.searchResult.Date;
          this.ReportInfo.Category = this.searchResult.Category;
          this.ReportInfo.Number = this.searchResult.Number;
          this.ReportInfo.clientName = this.searchResult.clientName;
          this.ReportInfo.status = this.searchResult.status;
          console.log(this.ReportInfo.Description);
          console.log(this.ReportInfo.Date);
          console.log(this.ReportInfo.Category);
          console.log(this.ReportInfo.Number);
          console.log(this.ReportInfo.clientName);
          console.log(this.ReportInfo.status);


        })
      this.Map.setView([resultLocation.lat, resultLocation.lng], 18, { animate: true }, {
        animate: true,
        duration: 5,
        easeLinearity: 0.25
      });
    });
    this.removeMarkers();
  }

  exitSearch() {
    this.searchActive = false;
    this.toggleBottomMenu = 'hide';
    this.Map.removeLayer(this.searchData);
    this.showReports();
    this.Map.setView([30.142833, 31.626871], 13, { animate: true }, {
      animate: true,
      duration: 1,
      easeLinearity: 0.25
    });
    this.inputValue = '';
  }

}
