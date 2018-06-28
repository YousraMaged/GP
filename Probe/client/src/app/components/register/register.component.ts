import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  user: User;
  confirmPassword: string;
  valid: boolean;

  constructor(
    public authService: AuthService,
    public navbarService: NavbarService,
    public flashMessagesService: FlashMessagesService,
    public router: Router,
    public route: ActivatedRoute
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

  ngOnInit() {
    this.navbarService.onPageChange.next(false);
  }

  rbtCheck() {
    this.isResident = !this.isResident;
  }

  passwordCheck(){
    this.valid = this.user.password == this.confirmPassword;
    console.log(this.valid);
  }


  register({ value, valid }) {
    if (valid) {
      this.authService.resigter(value).subscribe(res => {
        this.user = value;
        this.authService.login({
          email: this.user.email,
          password: this.user.password
        }).subscribe(res => {
          this.authService.onLogininChange.next(true);
        });
      });
      this.flashMessagesService.show(`Registration Successful! You are now logged in`, { cssClass: 'alert-success', timeout: 4000 });
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 4000)
    }
    else {
      this.flashMessagesService.show(`Please enter valid information`, { cssClass: 'alert-danger', timeout: 4000 });
      setTimeout(() => {
        this.router.navigate(['/register']);
      }, 4000)
    }
  }

}
