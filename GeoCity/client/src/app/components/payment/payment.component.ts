import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  billing: any = "../../../assets/img/travelccbackup1.jpg";

  constructor() { }

  ngOnInit() {
  }

}