import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;
  visible: boolean = true;
  userRole: string = 'user';

  constructor(
    public authService:AuthService,
    public router: Router
  ) { 
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.visible = !window.location.href.includes('register');
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
