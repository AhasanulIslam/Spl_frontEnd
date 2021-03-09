import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AdminService} from '../../services/admin/admin.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  cpForm;
  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.creatForm();
  }
  creatForm() {
    this.cpForm = this.fb.group({
      cur_pass: [''],
      new_pass: [''],
      retype_pass: ['']
    });
  }



  onSubmit() {
    if (this.cpForm.get('new_pass').value === this.cpForm.get('retype_pass').value) {
      const obj = {
        CurrentPassword: this.cpForm.get('cur_pass').value,
        NewPassword: this.cpForm.get('new_pass').value
      };
      this.adminService.changePassword(obj).subscribe(
        (res) => {
          if (res === 'ERROR') {
            alert('Wrong Current password');
            this.cpForm.reset();
          } else {
            alert (res);
            this.router.navigate(['/admin']).then();
          }
        }
      );
    } else {
      alert('Password not matched');
      this.cpForm.reset();
    }
  }

  isEmpty() {
    const val1 = this.cpForm.get('cur_pass').value;
    const val2 = this.cpForm.get('new_pass').value;
    const val3 = this.cpForm.get('retype_pass').value;
    if (this.checkNull(val1, val2, val3) || this.isZeroLength(val1, val2, val3)) {
      return true;
    }
    return false;
  }
  private checkNull(val1, val2, val3) {
    if ( val1 == null || val2 == null || val3 == null ) {
      return true;
    } else {
      return false;
    }
  }

  private isZeroLength(val1, val2, val3) {
    if (val1.length === 0 || val2.length === 0 || val3.length === 0) {
      return true;
    } else {
      return false;
    }
  }

}
