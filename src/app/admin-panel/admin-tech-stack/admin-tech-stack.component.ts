import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-admin-tech-stack',
  templateUrl: './admin-tech-stack.component.html',
  styleUrls: ['./admin-tech-stack.component.scss']
})
export class AdminTechStackComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
  // redirect to home if already logged in
    //   if (this.authenticationService.currentUserValue) {
    //       this.router.navigate(['/']);
    //   }
  }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required],
          email: ['', Validators.required],
          phone: ['', Validators.required],
          access: ['', Validators.required]
      });

      // get return url from route parameters or default to '/'
      // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      this.loading = true;
      // tslint:disable-next-line:max-line-length
      this.authenticationService.register(this.f.username.value, this.f.password.value, this.f.email.value, this.f.phone.value, this.f.access.value)
          .subscribe(
              data => {
                  this.router.navigate(['admin']);
                  console.log(data);
              },
              error => {
                  this.error = error;
                  this.loading = false;
              });

  }
}
