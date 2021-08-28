import { Staff } from './../_models/staff';
import { AdminService } from './../services/admin/admin.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogService } from '../dialog/confirmation-dialog.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-deleteAccount',
  templateUrl: './deleteAccount.component.html',
  styleUrls: ['./deleteAccount.component.scss']
})
export class DeleteAccountComponent implements OnInit {
  staffInfo: Staff[];

// private confirmationDialogService: ConfirmationDialogService
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

  // setDelete(staffId: number, stuf: Staff){
    setDelete(staffId: number, stuf: Staff){


    console.log(staffId);
    console.log("Deleting...");

    this.adminService.deleteUser(+staffId).subscribe(
      (res) => {
        console.log("Result is:");
        console.log(res);
        window.location.reload();
      }
    );
    console.log(staffId);

    stuf.isOpenDelete = false;
    
  }

  setCancel(stuf: Staff){

    stuf.isOpenDelete = false;
  }

  deleteAccount(stuf: Staff) {
    stuf.isOpenDelete = true;
  }


  // public openConfirmationDialog() {
  //   this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
  //   .then((confirmed) => console.log('User confirmed:', confirmed))
  //   .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  // }

}
