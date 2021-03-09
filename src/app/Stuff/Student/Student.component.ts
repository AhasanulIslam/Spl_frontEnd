import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Student } from 'src/app/_models/student';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-Student',
  templateUrl: './Student.component.html',
  styleUrls: ['./Student.component.scss']
})
export class StudentComponent implements OnInit {
  stuffFrom: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  students: Student[];
  registration: string;
  // title = 'Angular Search Using ng2-search-filter';
  searchText;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private adminService: AdminService
  ) {
  // redirect to home if already logged in
      // if (this.authenticationService.currentUserValue) {
      //     this.router.navigate(['/']);
      // }
  }

  ngOnInit() {
      this.stuffFrom = this.formBuilder.group({
        registration: ['', Validators.required],
        address: ['', Validators.required],
        bloodGroup: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        department: ['', Validators.required],
        fatherName: ['', Validators.required],
        firstname: ['', Validators.required],
        hallRoll: ['', Validators.required],
        lastname: ['', Validators.required],
        motherName: ['', Validators.required],
        nationality: ['', Validators.required],
        religion: ['', Validators.required],
        session: ['', Validators.required],
        stuffName: ['', Validators.required]
      });
      this.getStudents();
      // get return url from route parameters or default to '/'
      // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  getStudents() {
    this.authenticationService.getAllStudents()
        .subscribe(
          data => {
            this.students = data;
            console.log(this.students);
          }
        );
  }
  // tslint:disable-next-line:variable-name
  deleteStuds(student_Id: number) {
    this.adminService.studDeOption(+student_Id).subscribe(
      (res) => {
        console.log(res);
        window.location.reload();
      }
    );
    console.log(student_Id);
  }

  // convenience getter for easy access to form fields
  get f() { return this.stuffFrom.controls; }

  onSubmit() {
      this.submitted = true;
      // console.log(this.f.debit.value, this.f.credit.value, this.f.date.value, this.f.account_title.value);

      // stop here if form is invalid
      if (this.stuffFrom.invalid) {
          return;
      }

      this.loading = true;
      // tslint:disable-next-line:max-line-length
      this.authenticationService.studentac(this.f.registration.value, this.f.address.value, this.f.bloodGroup.value, this.f.dateOfBirth.value, this.f.department.value, this.f.fatherName.value, this.f.firstname.value, this.f.hallRoll.value, this.f.lastname.value, this.f.motherName.value, this.f.nationality.value, this.f.religion.value, this.f.session.value, this.f.stuffName.value)
          .subscribe(
              data => {
                  // this.router.navigate(['']);
                  console.log(data);
                  // console.log(this.f.debit.value, this.f.credit.value, this.f.date.value, this.f.account_title.value);
                  window.location.reload();
              },
              error => {
                  this.error = error;
                  this.loading = false;
              });
  }
}
