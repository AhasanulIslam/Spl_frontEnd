import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AdminService} from '../../services/admin/admin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public sections: any;

  constructor(private router: Router, private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getAllsections().subscribe(
      (res) => {
        this.sections = res;
        this.sections.shift();
      }
    );
  }

  onLogOut() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}
