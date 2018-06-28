import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Request } from '../../interfaces/Request';
import { SlideAnimation } from '../../animations/SlideDownAnimation';
import { FlashMessagesService } from 'angular2-flash-messages';
import { RequestService } from '../../services/request.service';
import { MapService } from '../../services/map.service';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
  animations: [SlideAnimation]
})
export class RequestsComponent implements OnInit {
  form_isVisible: boolean = false;
  value: any = null;
  selectedForm: string = '';
  request: Request;
  nId: string;
  canSubmit: boolean;

  selectChangeHandler(event: any) {
    this.selectedForm = event.target.value;
    this.value = event.target.value;
    if (this.value !== null) {
      this.form_isVisible = true;
    }
  }


  constructor(
    public router: Router,
    public flashMessagesService: FlashMessagesService,
    public requestService: RequestService,
    public mapService: MapService,
    public authService: AuthService
  ) {
    this.request = {
      Type: '',
      Location: {
        "lat": null,
        "lng": null
      },
      Date: null,
      parcelId: null,
      clientId: null,
      userName: null,
      Number: null,
      nationalID: null
    }

    this.canSubmit = true;
  }

  ngOnInit() {
    this.authService.getLoggedInUser().subscribe(res => {
      this.request.parcelId = res.ParcelID;
      this.request.nationalID = res.NationalID;
      this.request.userName = res.name;
      this.request.clientId = res.id;
      this.request.Date = new Date(Date.now());
      this.request.Number = Math.floor((Math.random() * 100000) + 99999);
    }, err => err, () => {
      this.getParcelInfo();
      this.nId = '**********' + (this.request.nationalID).toString().slice(-4);
    });
  }

  formActive(){
    this.canSubmit = !this.canSubmit;
    console.log(this.canSubmit);
  }

  getParcelInfo(){
    this.mapService.getByParcelId(this.request.parcelId).subscribe(res => {
      this.request.Location.lat = res.json().features[0].geometry.coordinates[1];
      this.request.Location.lng = res.json().features[0].geometry.coordinates[0];
    })
  }


  submitRequest({ value, valid }) {
    if (valid) {
      console.log(this.request);
      this.requestService.addRequest(this.request).subscribe(res => console.log(res), err => console.log(err));
      this.flashMessagesService.show('Request Submitted, We will keep you updated!', { cssClass: 'alert-success', timeout: 4000 });
      this.router.navigate(['/request']);
    } else {
      this.flashMessagesService.show('Please enter valid information', { cssClass: 'alert-danger', timeout: 4000 });
      console.log(valid);
      this.router.navigate(['/request']);
    }
  }

}
