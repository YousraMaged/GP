import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SlideAnimation } from '../../animations/SlideDownAnimation';
import { AuthService } from '../../services/auth.service';
import { NavbarService } from '../../services/navbar.service';
import { LoginDetails } from '../../interfaces/LoginDetails';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [SlideAnimation]
})
export class LoginComponent implements OnInit {

  Image:any = "../../../assets/img/login-side.jpg";
  user: LoginDetails;
  

  constructor(
    public authService:AuthService,
    public Navbar:NavbarService,
    public router: Router,
    public flashMessagesService:FlashMessagesService
  ) { 
    this.user = {
      email:null,
      password:null
    }
  }

  ngOnInit() {
    //this.Navbar.hide();
  }

  login({value,valid})
  {
    if(valid){
      this.authService.login(value).subscribe(res => {
        console.log(res);
        console.log(localStorage.getItem('token'));
        console.log(localStorage.getItem('userID'));
        this.flashMessagesService.show(`You're now logged in`, {cssClass:'alert-success', timeout: 4000});
        this.router.navigate(['login']);
        this.router.navigate(['/login']);
      });
    }
    else
    {
    }
  }


}
