import { Component, ElementRef, OnInit, ViewChild, style } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import * as leaflet from 'leaflet';
import { FlashMessagesService } from 'angular2-flash-messages';
import { BusService } from '../../services/bus.service';
import { Bus } from '../../interfaces/Bus';
import { map } from 'rxjs/operator/map';

const states = [];


@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.css'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 3000, noPause: true, showIndicators: true } }
  ]
})


export class BusComponent implements OnInit {

  image1: any = "../../../assets/img/Transportation hero.jpg";
  image2: any = "../../../assets/img/buses.jpg";
  image3: any = "../../../assets/img/Future-Blog.jpg";
  image4: any = "../../../assets/img/transportation_main.jpg";
  private defaultIcon = leaflet.icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl:  require('leaflet/dist/images/marker-shadow.png'),
    iconAnchor: [13, 41]
  });
  private StopIcon = leaflet.icon({
    iconUrl: require(`leaflet/dist/images/dot-circle.png`),
    iconAnchor: [7, 10],
    popupAnchor: [1, -15]
  });
  public route1: any;
  public stations1: any;
  public route2: any;
  public stations2: any;
  public bus: Bus;
  public Map: any;
  public Map1: any;
  public BaseMap: any;
  public BaseMap1: any;
  public stations: Array<any>;
  public buses: any;
  public line1: any;
  public stops1: any;

  constructor(public busService: BusService, public flashMessagesService: FlashMessagesService, public router: Router) {
    this.bus = {
      origin: '',
      destination: '',
      path: null,
      value: null,
      bus: null,
      info: false,
      Stations: [],
      busNumber: null,
      number: 0,
      stops: []
    }
  }

  ngOnInit() {
    leaflet.Marker.prototype.options.icon = this.StopIcon;
    this.Map = leaflet.map('map').setView([30.1097741, 31.49798361], 10.5);
    this.BaseMap = leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.Map);
    this.Map1 = leaflet.map('map1').setView([30.129440245, 31.515600265], 10.5);
    this.BaseMap1 = leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.Map1);
    this.bus.Stations = [];
    this.bus.busNumber = [];
    this.bus.stops = [];
  }


  toggle_info() {
    this.bus.info = !this.bus.info;
    }

    changeHeight(){
      document.getElementById('main').style.height = "1500px";
    }
  
    addRoute1(number) {
      this.busService.getRoute1().subscribe(res => {
        res;
        this.route1 = res.json();
        leaflet.geoJSON(this.route1, {color: '#00b3fd'}).addTo(this.Map);
      }, err => console.log(err));
    }
    
    addStations1(number) {
      let icon = this.StopIcon;
      this.busService.getStations1().subscribe(res => {
        res;
        this.stations1 = res.json();
        leaflet.geoJSON(this.stations1).addTo(this.Map);
      }, err => console.log(err));
    }

    addRoute2(number) {
      this.busService.getRoute2().subscribe(res => {
        res;
        this.route2 = res.json();
        leaflet.geoJSON(this.route2, {color: '#00b3fd'}).addTo(this.Map1);
      }, err => console.log(err));
    }
    
    addStations2(number) {
      this.busService.getStations2().subscribe(res => {
        res;
        this.stations2 = res.json();
        leaflet.geoJSON(this.stations2).addTo(this.Map1);
      }, err => console.log(err));
    }
    
    submitBus({ value, valid }: { value: any, valid: boolean }) {
      if (valid) {
        this.changeHeight();
        this.busService.getPath(this.bus.origin, this.bus.destination).subscribe(res => {
          res;
          this.bus.path = res.json();
          this.buses = this.bus.path.Stations;
          if (this.bus.path.Stations.length > 1) {
            for (let i = 0; i < this.bus.path.Stations.length; i++) {
              this.bus.Stations = this.buses[i].Stations;
              this.bus.busNumber = this.buses[i].number;
                }
              } else {
                this.bus.Stations = this.bus.path.Stations[0].Stations;
                this.bus.busNumber = this.bus.path.Stations[0].number;
                }
              })
                this.addRoute1(this.bus.number);
                this.addStations1(this.bus.number);
                this.addRoute2(this.bus.number);
                this.addStations2(this.bus.number);
            } else {
        this.flashMessagesService.show('Please enter valid information', { cssClass: 'alert-danger', timeout: 4000 });
      }
    }
  }
  
  
  