import { Component, OnInit } from '@angular/core';
import {Router, Navigation, ActivatedRoute} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {AdminService} from '../../services/admin/admin.service';
import {SectionsService} from '../../services/sections.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  public data;
  public secID: number;
  public itemID: number;
  editForm: any;
  sections = ['', 'GIS', 'M&E', 'Web App', 'Mobile App', 'Business Intelligence', 'Consultancy Services'];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private adminService: AdminService,
              private secService: SectionsService) {}

  ngOnInit() {
    this.createForm();
    this.extractId();
    this.secService.getSingleItem(this.secID, this.itemID).subscribe(
      (res) => {
        this.data = res;
        this.setForm();
      }
    );
  }

  // extractNavigationExtras() {
  //   this.title = this.router.getCurrentNavigation().extras.state.title;
  // }

  createForm() {
    this.editForm = this.fb.group({
      Name: [''],
      Picture: [''],
      Info: [''],
      Link: ['']
    });
  }
  setForm() {
    this.editForm.setValue({
      Name: this.data.Name,
      Picture: this.data.Picture,
      Info: this.data.Info,
      Link: this.data.Link
    });
  }

  onSubmit() {
    const obj = this.editForm.value;
    this.adminService.updateSectionData(this.itemID, obj).subscribe(
      (res) => {
        alert('Edit Successful');
      }
    );
  }
  extractId() {
    this.route.params.subscribe(
      (params) => {
        this.secID = params.id;
        this.itemID = params.itemId;
      }
    );
  }
}
