import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    public route: ActivatedRoute,
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
      this.flashMessagesService.show(`You're now logged in`, {cssClass:'alert-success', timeout: 4000});
      this.authService.login(value).subscribe(res => {
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigate([returnUrl || '/']);
      });
    }
    else
    {
      this.flashMessagesService.show(`Incorrect username or Password`, {cssClass:'alert-danger', timeout: 4000});
    }
  }


}
