import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Room } from 'src/app/_models/room';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-Room_Teacher',
  templateUrl: './Room_Teacher.component.html',
  styleUrls: ['./Room_Teacher.component.scss']
})
// tslint:disable-next-line:class-name
export class Room_TeacherComponent implements OnInit {
  stuffFrom: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  rooms: Room[];
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
        roomNumber: ['', Validators.required],
        capacity: ['', Validators.required],
        building: ['', Validators.required],
        studentPhoneNo: ['', Validators.required],
        admitDate: ['', Validators.required],
        leftDate: ['', Validators.required],
        hallFee: ['', Validators.required],
        feeYear: ['', Validators.required],
        hallRoll: ['', Validators.required],
      });
      this.getRooms();
      // get return url from route parameters or default to '/'
      // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  getRooms() {
    this.authenticationService.getAllRooms()
        .subscribe(
          data => {
            this.rooms = data;
            console.log(this.rooms);
          }
        );
  }
  deleteRooms(roomId: number) {
    this.adminService.roomsDeOption(+roomId).subscribe(
      (res) => {
        console.log(res);
        window.location.reload();
      }
    );
    console.log(roomId);
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
      this.authenticationService.roomAcc(this.f.roomNumber.value, this.f.capacity.value, this.f.building.value, this.f.studentPhoneNo.value, this.f.admitDate.value, this.f.leftDate.value, this.f.hallFee.value, this.f.feeYear.value, this.f.hallRoll.value)
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
