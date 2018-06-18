import { Component, OnInit, OnDestroy } from '@angular/core';
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
  userRole: string = null;

  constructor(
    public authService: AuthService,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.visible = !window.location.href.includes('register');
    if (localStorage.getItem('userID') !== null) {
      this.authService.getRole(localStorage.getItem('userID'))
      .subscribe(res => {
        this.userRole = res.user.role;
        localStorage.setItem('role',res.user.role);
      });
    }else{
      this.userRole = 'user';
    }
  }

  logout() {
    this.authService.logout().subscribe(res => {
      this.router.navigate(['/']);
    });
  }

}
