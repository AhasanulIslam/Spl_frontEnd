import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Inventory } from 'src/app/_models/inventory';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-Inventory',
  templateUrl: './Inventory.component.html',
  styleUrls: ['./Inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  stuffFrom: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  inventories: Inventory[];
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
          status: ['', Validators.required],
          date: ['', Validators.required]
      });
      this.getInventories();
      // get return url from route parameters or default to '/'
      // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  getInventories() {
    this.authenticationService.getAllInventories()
        .subscribe(
          data => {
            this.inventories = data;
            console.log(this.inventories);
          }
        );
  }
  deleteInventories(inventoryId: number) {
    this.adminService.inventoryDeOption(+inventoryId).subscribe(
      (res) => {
        console.log(res);
        window.location.reload();
      }
    );
    console.log(inventoryId);
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
      this.authenticationService.invenAcc(this.f.status.value, this.f.date.value)
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
