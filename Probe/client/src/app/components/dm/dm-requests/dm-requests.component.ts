import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { RequestService } from '../../../services/request.service';
import { Request } from '../../../interfaces/Request';
import * as leaflet from 'leaflet';

@Component({
  selector: 'app-dm-requests',
  templateUrl: './dm-requests.component.html',
  styleUrls: ['./dm-requests.component.css']
})
export class DmRequestsComponent implements OnInit {

  public toggleBottomMenu: string;
  public isLoading: boolean;
  public Map: any;
  public BaseMap: any;
  public Requests: Array<Request>;
  public RequestInfo;
  public searchResult;
  public mapData;
  public searchData;
  public searchActive: boolean;
  public inputValue: any;
  public markerIcon = require('leaflet/dist/images/marker-icon.png');
  private defaultIcon = leaflet.icon({
    iconUrl: this.markerIcon,
    iconAnchor: [16, 32]
  });
  private ElectricIcon = leaflet.icon({
    iconUrl: require(`leaflet/dist/images/electric-icon.png`),
    iconAnchor: [17.5, 17.5], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -15] // point from which the popup should open relative to the iconAnchor
  });
  private GasIcon = leaflet.icon({
    iconUrl: require(`leaflet/dist/images/gas-icon.png`),
    iconAnchor: [17.5, 17.5], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -15] // point from which the popup should open relative to the iconAnchor
  });
  private LicenseIcon = leaflet.icon({
    iconUrl: require(`leaflet/dist/images/license-icon.png`),
    iconAnchor: [17.5, 17.5], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -15] // point from which the popup should open relative to the iconAnchor
  });
  private WaterIcon = leaflet.icon({
    iconUrl: require(`leaflet/dist/images/water-icon.png`),
    iconAnchor: [17.5, 17.5], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -15] // point from which the popup should open relative to the iconAnchor
  });
  private PhoneIcon = leaflet.icon({
    iconUrl: require(`leaflet/dist/images/phone-icon.png`),
    iconAnchor: [17.5, 17.5], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -15] // point from which the popup should open relative to the iconAnchor
  });


  constructor(
    public requestService: RequestService,
    public router: Router,
    private route: ActivatedRoute,
  ) {
    this.toggleBottomMenu = 'hide';
    this.Requests = [];
    this.mapData = [];
    this.inputValue = '';
    this.searchActive = false;
    this.RequestInfo = {
      Type: '',
      Date: '',
      parcelId: '',
      Number: ''
    }
    this.isLoading = true;
  }
  
  ngOnInit() {
    leaflet.Marker.prototype.options.icon = this.defaultIcon;
    this.Map = leaflet.map('map',{zoomControl:false}).setView([30.142833, 31.626871], 13);
    leaflet.control.zoom({
      position: 'topright'
    }).addTo(this.Map);
    this.BaseMap = leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.Map);
    this.showRequests();
  }

  showRequests() {
    this.requestService.getRequests().subscribe(res => {
      this.Requests = res.json();
      console.log(this.Requests[0].Type);
      for (let i = 0; i < this.Requests.length; i++) {
        let popup = leaflet.popup()
          .setContent(`<h2> ${this.Requests[i].Type} </h2>`);
        let icon;
        switch (this.Requests[i].Type) {
          case 'Gas supply':
            icon = this.GasIcon;
            break;
          case 'Electricity supply':
            icon = this.ElectricIcon;
            break;
          case 'Water Supply':
            icon = this.WaterIcon;
            break;
          case 'Telephone line':
            icon = this.PhoneIcon;
            break;
          case 'Parcel license':
            icon = this.LicenseIcon;
            break;
          default:
            icon = this.defaultIcon;
            break;
        }
        this.mapData.push(leaflet.marker([this.Requests[i].Location.lat, this.Requests[i].Location.lng])
          .addTo(this.Map).setIcon(icon).on('click', () => {
            this.toggleBottomMenu = 'show';
            // this.Map.panTo(new leaflet.LatLng(this.Requests[i].Location.lat, this.Requests[i].Location.lng), {
            //   animate: true,
            //   duration: 1,
            //   easeLinearity: 0.25
            // })
            this.Map.setView([this.Requests[i].Location.lat, this.Requests[i].Location.lng], 15,{animate:true} , {
              animate: true,
              duration: 6,
              easeLinearity: 0.25
            });
            this.RequestInfo.Type = this.Requests[i].Type;
            this.RequestInfo.Date = this.Requests[i].Date;
            this.RequestInfo.parcelId = this.Requests[i].parcelId;
            this.RequestInfo.Number = this.Requests[i].Number;
            console.log(this.RequestInfo);
          }));

      }
    }, err => err, () => {
      this.isLoading = false;
    })
  }
  
  removeMarkers(){
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
    this.requestService.searchRequest(e.target.value).subscribe(res => {
      this.searchResult = res.json().Request[0];
      // this.url = window.location.href + '?number=' + this.searchResult.Number;
      // window.history.replaceState(null, null, this.url);
      let resultLocation = this.searchResult.Location;
      this.searchData = leaflet.marker([resultLocation.lat, resultLocation.lng])
        .addTo(this.Map).on('click', () => {
          this.toggleBottomMenu = 'show';
          this.RequestInfo.Type = this.searchResult.Type;
          this.RequestInfo.Date = this.searchResult.Date;
          this.RequestInfo.parcelId = this.searchResult.parcelId;
          this.RequestInfo.Number = this.searchResult.Number;
          console.log(this.RequestInfo);
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
    this.showRequests();
    this.Map.setView([30.142833, 31.626871], 13, {animate:true},{
      animate: true,
      duration: 1,
      easeLinearity: 0.25
    });
    this.inputValue = '';
  }
}
