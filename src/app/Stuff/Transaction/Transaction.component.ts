import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Transaction } from 'src/app/_models/transaction';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-Transaction',
  templateUrl: './Transaction.component.html',
  styleUrls: ['./Transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  stuffFrom: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  transactions: Transaction[];
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
          debit: ['', Validators.required],
          credit: ['', Validators.required],
          date: ['', Validators.required],
          accountTitle: ['', Validators.required],
          description: ['', Validators.required],
          staffName: ['', Validators.required]
      });
      this.getTransactions();
      // get return url from route parameters or default to '/'
      // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  getTransactions() {
    this.authenticationService.getAllTransactions()
        .subscribe(
          data => {
            this.transactions = data;
            console.log(this.transactions);
          }
        );
  }
  deleteTrns(transactionId: number) {
    this.adminService.trnsDeOption(+transactionId).subscribe(
      (res) => {
        console.log(res);
        window.location.reload();
      }
    );
    console.log(transactionId);
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
      this.authenticationService.transac(this.f.debit.value, this.f.credit.value, this.f.date.value, this.f.accountTitle.value, this.f.description.value, this.f.staffName.value)
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
