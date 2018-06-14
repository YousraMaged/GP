import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavbarService } from '../../services/navbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Image:any = "../../../assets/img/login-side.jpg";
  user = {
    email: '',
    password: ''
  }

  constructor(
    public authService:AuthService,
    public Navbar:NavbarService,
    public router: Router
  ) { 

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
        this.router.navigate(['/login']);
      });
    }
    else
    {
      console.log('Invalid');
    }
  }


}
