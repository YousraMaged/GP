import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavbarService } from '../../services/navbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;
  userRole: string = 'user';

  constructor(
    public authService:AuthService,
    public navbar:NavbarService,
    public router: Router
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    console.log('Logged in: ' + this.authService.isLoggedIn());
    console.log(localStorage.getItem('token'));
  }

  logout()
  {
    this.authService.logout().subscribe(res => {
      this.router.navigate(['/login']);
    });
    
  }

}
