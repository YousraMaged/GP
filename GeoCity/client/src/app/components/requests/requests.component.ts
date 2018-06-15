import { Component, OnInit } from '@angular/core';
import { Text } from '@angular/compiler';
import { Input } from '@angular/core/src/metadata/directives';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  form_isVisible: boolean = false;
  value: any = null;
  selectedForm: string = '';
  request = {
    category: '',
    userName: '',
    userNationalID: '',
    form: ''
  }

  selectChangeHandler(event: any) {
    this.selectedForm = event.target.value;
    this.request.form = `Applying form to request ${this.selectedForm} .If your submission does not meet these requirements,we’ll notify you that your application has been rejected. You will have 72 hours or until the original due date,whichever is later, to resubmit your application in the required format. Resubmitted applications must be postmarked within that time frame and shipped via an overnight delivery service.`
    this.value = event.target.value;
    if (this.value !== null) {
      this.form_isVisible = true;
    }
  }

  submitRequest({ value, valid }) {
    console.log(value);
  }

  constructor() {
  }

  ngOnInit() {
  }

}
