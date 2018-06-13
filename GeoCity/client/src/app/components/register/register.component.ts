import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isResident: boolean = false;
  background: string = '../../../assets/img/register.jpg';
  user = {
    name: '',
    email: '',
    username: '',
    password: '',
    mobile: '',
    isResident: this.isResident,
    nationalID: ''
  }

  constructor(
    public Navbar: NavbarService,
    public authService: AuthService
  ) { }

  ngOnInit(){
    this.Navbar.hide();
  }

  rbtCheck(){
    this.isResident = !this.isResident;
  }

  register(){
    this.authService.resigter(this.user).subscribe(res => console.log(res));
  }

}
