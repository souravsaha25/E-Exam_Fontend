import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-Layout-component',
  templateUrl: './Layout-component.component.html',
  styleUrls: ['./Layout-component.component.css']
})
export class LayoutComponentComponent {
  isCollapsed = true;
  Role: string = "";
  Id: string = "";
  showAdminMenu: boolean = false;

  constructor(private router: Router,
    private cookieService: CookieService) { }

  ngOnInit() {
    if (sessionStorage.getItem('userRole') == null && sessionStorage.getItem('userID') == null) {
      this.router.navigate(['/Login']);
    } else {
      if (sessionStorage.getItem('userRole') == "Admin") {
        this.showAdminMenu = true;
      }
    }
  }

  onLogout() {
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('userID');
    sessionStorage.removeItem('token');
    localStorage.removeItem('time');
    this.cookieService.deleteAll();
    this.router.navigate(['/Login']);
  }

  getProfile() {
    let UID = sessionStorage.getItem('userID');
  }
}
