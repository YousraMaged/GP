import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SlideAnimation } from '../../animations/SlideDownAnimation';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NavbarService } from '../../services/navbar.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [SlideAnimation]
})
export class RegisterComponent implements OnInit {
  isResident: boolean = false;
  background: string = '../../../assets/img/register.jpg';
  user : User;

  constructor(
    public authService: AuthService,
    public flashMessagesService:FlashMessagesService,
    public router: Router,
  ) {
    this.user = {
      name: null,
      email: null,
      username: null,
      password: null,
      mobile: null,
      isResident: null,
      nationalID: null,
      role: 'user'
    }
  }

  ngOnInit(){
  }

  rbtCheck(){
    this.isResident = !this.isResident;
  }


  register({value,valid}){
    if (valid) {
      this.authService.resigter(value).subscribe(res => console.log(res));
    }
    else {
      this.flashMessagesService.show('Please enter valid information', {cssClass:'alert-danger', timeout: 4000});
      this.router.navigate(['register']);
    }
  }

}
