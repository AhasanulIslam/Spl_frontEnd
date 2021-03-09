import { SectionsService } from './../services/sections.service';
import { Component, OnInit } from '@angular/core';
import { Student } from '../_models/student';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services';
import { AdminService } from '../services/admin/admin.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  title = 'ABOUT US';
  // tslint:disable-next-line: max-line-length
  description = ' ';
  stuffFrom: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  students: Student[];
  registration: string;
  // title = 'Angular Search Using ng2-search-filter';
  searchText;
  logo = 'https://thefinancialexpress.com.bd/uploads/1591158383.jpg';
  // authenticationService: any;
  constructor(
    private formBuilder: FormBuilder,
    private section: SectionsService,
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
    this.section.getSections().subscribe(
      (data) => {
        this.title = data[0].Title;
        this.description = data[0].SectionDescription;
        // this.logo = data[0].ImagePath;
      }
    );

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
