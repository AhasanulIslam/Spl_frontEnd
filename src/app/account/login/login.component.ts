import { User } from './../../_models/user';
import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../services/admin/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  User: User;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private jwtService: AdminService) {
    // redirect to home if already logged in
    if (localStorage.getItem('access_token')) {
      this.router.navigate(['/authenticate']);
    }
  }

  ngOnInit(): void {
    this.creatForm();
  }
  creatForm() {
    this.loginForm = this.fb.group({
      UserName: [''],
      Password: ['']
    });
  }


  onLoginSubmit() {
    this.jwtService.adminLogin(this.loginForm.value)
      .subscribe(
        (res) => {
          this.User = res;
          if (this.User.token === 'ERROR') {
            this.showInvalidMessaqge();
          } else {
            this.setLoginToken(this.User.token);
            if (this.User.access_Level === 'teacher') {
              this.router.navigate(['/teacher']);
            } else if (this.User.access_Level === 'stuff') {
              this.router.navigate(['/stuff/student']);
            }
          }
        },
      );
  }

  private showInvalidMessaqge() {
    alert('Invalid Usename or Password');
    this.loginForm.reset();
  }

  private setLoginToken(res) {
    const token = res;
    localStorage.setItem('access_token', token);
    this.router.navigate(['/admin']);
  }
}
