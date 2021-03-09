import { Staff } from './../_models/staff';
import { AdminService } from './../services/admin/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-deleteAccount',
  templateUrl: './deleteAccount.component.html',
  styleUrls: ['./deleteAccount.component.scss']
})
export class DeleteAccountComponent implements OnInit {
  staffInfo: Staff[];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getStuffs();
  }

  getStuffs( ) {
    this.adminService.getAllStuffs().subscribe(
      (res) => {
        console.log(res);
        this.staffInfo = res;
        console.log(this.staffInfo);
      }
    );
  }

  deleteAccount(staffId: number) {
    this.adminService.deleteUser(+staffId).subscribe(
      (res) => {
        console.log(res);
        window.location.reload();
      }
    );
    console.log(staffId);
  }

}
