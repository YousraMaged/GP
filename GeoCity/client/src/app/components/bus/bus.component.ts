import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import * as leaflet from 'leaflet';
import { FlashMessagesService } from 'angular2-flash-messages';
import { BusService } from '../../services/bus.service';

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
  user = {
    origin: '',
    destination: ''
  }
  path: any;
  value: any;
  bus: any;
  info: boolean;
  Stations: Array<any>;
  busNumber: Array<any>;
  public Map: any;
  public BaseMap: any;




  constructor(public busService: BusService, public flashMessagesService: FlashMessagesService, public router: Router) {

    this.info = false;
  }

  ngOnInit() {

    this.Stations = [];
    this.busNumber=[];
  }

  toggle_info() {
    this.info = !this.info;
    this.Map = leaflet.map('map').setView([30.142833, 31.626871], 13);
    this.BaseMap = leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.Map);
  }

  submitBus({ value, valid }: { value: any, valid: boolean }) {
    if (valid) {
      this.busService.getpath(this.user.origin, this.user.destination).subscribe(res => {
        res;
        this.path = res.json();
        if (this.path.Stations.length > 1) {
          for (let i = 0; i < this.path.Stations.length; i++) {
            this.Stations.push(this.path.Stations[i].Stations);
            this.busNumber.push(this.path.Stations[i].number);
            console.log(this.busNumber);
            console.log(this.Stations);
          }
        } else {
          this.Stations = this.path.Stations[0].Stations;
          this.busNumber = this.path.Stations[0].number;
          console.log(this.busNumber);
          console.log(this.Stations[0]);
        }
      })
    } else {
      this.flashMessagesService.show('Please enter valid information', { cssClass: 'alert-danger', timeout: 4000 });
    }
  }
}
