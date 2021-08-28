import { Product } from './../../_models/product';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-Product',
  templateUrl: './Product.component.html',
  styleUrls: ['./Product.component.scss']
})
export class ProductComponent implements OnInit {
  stuffFrom: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  products: Product[];
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
          name: ['', Validators.required],
          date: ['', Validators.required],
          rejectedProduct: ['', Validators.required],
          purchaseProduct: ['', Validators.required],
          rate: ['', Validators.required],
          availableProduct: ['', Validators.required]
      });
      this.getProducts();
      // get return url from route parameters or default to '/'
      // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  getProducts() {
    this.authenticationService.getAllProducts()
        .subscribe(
          data => {
            this.products = data;
            console.log(this.products);
          }
        );
  }
  // deleteProducts(productId: number) {
  //   this.adminService.productDeOption(+productId).subscribe(
  //     (res) => {
  //       console.log(res);
  //       window.location.reload();
  //     }
  //   );
  //   console.log(productId);
  // }



  // setDelete(staffId: number, stuf: Staff){
    setDelete(productId: number, pro: Product){


      console.log(productId);
      console.log("Deleting...");
  
      this.adminService.productDeOption(+productId).subscribe(
        (res) => {
          console.log("Result is:");
          console.log(res);
          window.location.reload();
        }
      );
      console.log(productId);
  
      pro.isOpenDelete = false;
      
    }
  
    setCancel(pro: Product){
  
      pro.isOpenDelete = false;
    }
  
    deleteProducts(pro: Product) {
      pro.isOpenDelete = true;
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
      this.authenticationService.productAcc(this.f.name.value, this.f.date.value, this.f.rejectedProduct.value, this.f.purchaseProduct.value, this.f.rate.value, this.f.availableProduct.value)
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
