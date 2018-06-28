import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import * as leaflet from 'leaflet';
import { ECONNABORTED } from 'constants';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  Result: any;
  public Map: any;
  public isLoading: boolean;
  public BaseMap: any;
  public Layer: any;
  public service: any;
  public icon;
  public searchResult;
  public resultLocation;
  public searchActive: boolean;
  public markerIcon = require('leaflet/dist/images/marker-icon.png');
  private defaultIcon = leaflet.icon({
    iconUrl: this.markerIcon,
    iconAnchor: [16, 32]
  });
  private SchoolIcon = leaflet.icon({
    iconUrl: require(`leaflet/dist/images/school.png`),
    iconAnchor: [16, 16],
    popupAnchor: [1, -15]
  });
  private HospitalIcon = leaflet.icon({
    iconUrl: require(`leaflet/dist/images/hospital.png`),
    iconAnchor: [16, 16],
    popupAnchor: [1, -15]
  });
  private GreenAreaIcon = leaflet.icon({
    iconUrl: require(`leaflet/dist/images/GA.png`),
    iconAnchor: [16, 16],
    popupAnchor: [1, -15]
  });
  private PoliceIcon = leaflet.icon({
    iconUrl: require(`leaflet/dist/images/policeman.png`),
    iconAnchor: [16, 16],
    popupAnchor: [1, -15]
  });
  private CultureIcon = leaflet.icon({
    iconUrl: require(`leaflet/dist/images/culture.png`),
    iconAnchor: [16, 16],
    popupAnchor: [1, -15]
  });
  private OfficeIcon = leaflet.icon({
    iconUrl: require(`leaflet/dist/images/office.png`),
    iconAnchor: [16, 16],
    popupAnchor: [1, -15]
  });
  private BankIcon = leaflet.icon({
    iconUrl: require(`leaflet/dist/images/bank.png`),
    iconAnchor: [16, 16],
    popupAnchor: [1, -15]
  });
  private MallIcon = leaflet.icon({
    iconUrl: require(`leaflet/dist/images/mall.png`),
    iconAnchor: [16, 16],
    popupAnchor: [1, -15]
  });
  private MailIcon = leaflet.icon({
    iconUrl: require(`leaflet/dist/images/mail.png`),
    iconAnchor: [16, 16],
    popupAnchor: [1, -15]
  });
  private HotelIcon = leaflet.icon({
    iconUrl: require(`leaflet/dist/images/hotel.png`),
    iconAnchor: [16, 16],
    popupAnchor: [1, -15]
  });
  private ClubIcon = leaflet.icon({
    iconUrl: require(`leaflet/dist/images/club.png`),
    iconAnchor: [16, 16],
    popupAnchor: [1, -15]
  });
  private MosqueIcon = leaflet.icon({
    iconUrl: require(`leaflet/dist/images/mosque.png`),
    iconAnchor: [16, 16],
    popupAnchor: [1, -15]
  });
  private RestaurantIcon = leaflet.icon({
    iconUrl: require(`leaflet/dist/images/restaurant.png`),
    iconAnchor: [16, 16],
    popupAnchor: [1, -15]
  });
  private FireIcon = leaflet.icon({
    iconUrl: require(`leaflet/dist/images/Fire.png`),
    iconAnchor: [16, 16],
    popupAnchor: [1, -15]
  });
  private newIcon = leaflet.icon({
    iconUrl: require(`leaflet/dist/images/locating.png`),
    iconAnchor: [16, 16],
    popupAnchor: [1, -15]
  });
 
  constructor(public mapService: MapService) {
    this.isLoading = true;
  }

  ngOnInit() {
    leaflet.Marker.prototype.options.icon = this.defaultIcon;
    this.Map = leaflet.map('map', { zoomControl: false }).setView([30.147662, 31.641596], 15.5);
    leaflet.control.zoom({
      position: 'topright'
    }).addTo(this.Map);
    this.BaseMap = leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.Map);
    this.mapService.getServices().subscribe(res => {
      res;
      this.service = res.json();
      console.log(this.service);
      for (let i = 0; i < this.service.features.length; i++) {
        // let popup = leaflet.popup();
        switch (this.service.features[i].properties.Usage) {
          case 'School':
          case 'Univeristy':
          case 'Incubation':
          this.icon = this.SchoolIcon;
          break;
          case 'Hospital':
          case 'Ambulance':
          this.icon = this.HospitalIcon;
          break;
          case 'Green Area':
          this.icon = this.GreenAreaIcon;
          break;
          case 'Police Station':
          this.icon = this.PoliceIcon;
          break;
          case 'Cultural Center':
          this.icon = this.CultureIcon;
          break;
          case 'Office':
          this.icon = this.OfficeIcon;
          break;
          case 'Bank':
          case 'Money and Business Center':
          this.icon = this.BankIcon;
          break;
          case 'Mall':
          case 'Fair Zone':
          case 'Fair Zones':
          case 'Mixed (Mall and Offie)':
          this.icon = this.MallIcon;
          break;
          case 'Post Office':
          this.icon = this.MailIcon;
          break;
          case 'Hotel':
          this.icon = this.HotelIcon;
          break;
          case 'Youth Club':
          case 'Social':
          this.icon = this.ClubIcon;
          break;
          case 'Mosque':
          this.icon = this.MosqueIcon;
          break;
          case 'Restaurant':
          case 'Resurant':
          this.icon = this.RestaurantIcon;
          break;
          case 'Fire Extinguisher':
          this.icon = this.FireIcon;
          break;
          default:
          this.icon = this.MallIcon;
          break;
        }
        leaflet.marker([this.service.features[i].geometry.coordinates[1], this.service.features[i].geometry.coordinates[0]])
        .addTo(this.Map).setIcon(this.icon).bindPopup(this.service.features[i].properties.S_ID);
      }
    }, err => console.log(err), () =>{
      this.isLoading = false;
    });
  }

  search(e) {
    this.searchActive = true;
    let S = `'${e.target.value}%25'`;
    this.Map.setView([30.147662, 31.641596], 15.5, {animate: true }, {
          animate: true,
          duration: 1,
          easeLinearity: 0.25
        }
    );
    // this.mapService.getOne(S).subscribe(res => {
    //   res;
    //   this.searchResult = res.json();
    //   console.log(this.searchResult)
    //   this.resultLocation = this.searchResult.features.geometry.coordinates;
    //   this.Map.setView([this.resultLocation.lat, this.resultLocation.lng], 18, { animate: true }, {
    //     animate: true,
    //     duration: 5,
    //     easeLinearity: 0.25
    //   });
    //   leaflet.marker([this.resultLocation.lat, this.resultLocation.lng])
    //   .addTo(this.Map).setIcon(this.icon).bindPopup(this.searchResult.features.properties.S_ID);
    //   this.searchActive = false;
    // });
  }
}
