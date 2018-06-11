import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Result: any;

  constructor(public mapService:MapService) { 
    

    this.mapService.getResult().subscribe(res => {
      console.log(res.json());
      this.Result = res.json();
      console.log(this.Result.features);
    });

  }

  ngOnInit() {
  }
  
}
