import { Component, OnInit } from '@angular/core';
import { Text } from '@angular/compiler';
import { Input } from '@angular/core/src/metadata/directives';
import { SlideAnimation } from '../../animations/SlideDownAnimation';


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
  request = {
    category: '',
    userName: '',
    userNationalID: ''  }

  selectChangeHandler(event: any) {
    this.selectedForm = event.target.value;
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
