import { Component, OnInit, ViewChild } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
//import { BusService } from '../../services/bus.service';

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
  Route: any;

 
  value: any = null;

  selectChange(e)
  {
    this.value = e.target.value;
  }




  constructor() {
    
  }

  ngOnInit() {

  }

}