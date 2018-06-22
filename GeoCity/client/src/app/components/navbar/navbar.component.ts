import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavbarService } from '../../services/navbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = this.authService.isLoggedIn();
  visible: boolean = true;
  userRole: string = localStorage.getItem('role') || 'user';

  constructor(
    public authService: AuthService,
    public navbarService: NavbarService,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.authService.onLogininChange.subscribe(
      (isLoggedIn) => { this.isLoggedIn = isLoggedIn }
    );
    this.navbarService.onPageChange.subscribe(
      (visible) => { this.visible = visible }
    );
    this.authService.onٌRoleChange.subscribe(
      (userRole) => {this.userRole = userRole}
    )
  }

  logout() {
    this.authService.logout().subscribe(res => {
      this.router.navigate(['/']);
      this.authService.onLogininChange.next(false);
      this.authService.onٌRoleChange.next('user');
    });
  }

}
