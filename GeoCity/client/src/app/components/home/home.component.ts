import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Result: any;
  homebg :any = "../../../assets/img/homebg.jpg";
  item1:any ="../../../assets/img/item1.png";
  item2:any ="../../../assets/img/item2.png";
  item3:any ="../../../assets/img/item3.png";
  item4:any ="../../../assets/img/item4.png";
  item5:any ="../../../assets/img/item5.png";
  item6:any ="../../../assets/img/item6.png";
  
  

  constructor(public mapService:MapService) { 
    
  }

  ngOnInit() {

  }


  
}
