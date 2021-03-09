import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {AdminService} from '../../services/admin/admin.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  public title;
  public secID;
  addForm: any;

  constructor(private router: Router,
              private fb: FormBuilder,
              private adminService: AdminService,
              private route: ActivatedRoute) {
    this.extractNavigationExtras();
  }

  ngOnInit() {
    this.createForm();
    this.extractId();
  }
  extractNavigationExtras() {
    this.title = this.router.getCurrentNavigation().extras.state.title;
  }
  createForm() {
    this.addForm = this.fb.group({
      Name: [''],
      Picture: [''],
      Info: [''],
      Link: ['']
    });
  }

  onSubmit() {
    this.adminService.addData(this.secID, this.addForm.value).subscribe(
      (res) => {
        alert('New Item Added');
        this.router.navigate(['/admin/section', this.secID]);
      }
    );
  }
  extractId() {
    this.route.params.subscribe(
      (param) => {
        this.secID = param.id;
      }
    );
  }
  createObject() {
    return {
      Id: 1,
      Name: this.addForm.get('Name').value,
      Picture: this.addForm.get('Picture').value,
      Info: this.addForm.get('Info').value,
      Link: this.addForm.get('Link').value
    };
  }

}
