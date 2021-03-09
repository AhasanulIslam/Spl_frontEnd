import { Staff } from './../../_models/staff';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../services/admin/admin.service';

@Component({
  selector: 'app-admin-about',
  templateUrl: './admin-about.component.html',
  styleUrls: ['./admin-about.component.scss']
})
export class AdminAboutComponent implements OnInit {

  staffInfo: Staff[];
  public aboutForm: FormGroup;
  public  pData;
  something: any;
  constructor(private router: Router,
              private route: ActivatedRoute,
              public fb: FormBuilder,
              private adminService: AdminService) {}
  ngOnInit() {
    this.getStuffs();
    this.createForm();
    this.adminService.getData('about').subscribe(
      (data) => {
        this.pData = data;
        this.setFormValue(data);
      }
    );
  }
  createForm() {
    this.aboutForm = this.fb.group({
      Title: [''],
      SectionDescription: [''],
      ImagePath: ['']
    });
  }

  setFormValue(data) {
    this.aboutForm.setValue(
      {
        Title: data.Title,
        SectionDescription: data.SectionDescription,
        ImagePath: data.ImagePath
      }
    );
  }

  onSubmit() {
    const obj = this.createObject();
    this.adminService.updateSection(this.pData.Id, obj).subscribe(
      (res) => {
        alert('Data Updated');
      },
      (err) => { throw  err; }
    );
  }

  createObject() {
    return {
      Id: this.pData.Id,
      Title: this.aboutForm.get('Title').value,
      ImagePath: this.aboutForm.get('ImagePath').value,
      SectionDescription: this.aboutForm.get('SectionDescription').value
    };
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
}
