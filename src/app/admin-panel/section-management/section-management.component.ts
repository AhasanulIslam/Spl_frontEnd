import { Component, OnInit } from '@angular/core';
import {Section} from '../../sections/section';
import {FormBuilder, Validators} from '@angular/forms';
import {AdminService} from '../../services/admin/admin.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Router} from '@angular/router';

@Component({
  selector: 'app-section-management',
  templateUrl: './section-management.component.html',
  styleUrls: ['./section-management.component.scss']
})
export class SectionManagementComponent implements OnInit {
  addSectionForm: any;
  sections = [];

  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit() {
    this.createForm();
    this.getAllSections();
  }

  onAdd() {
    console.log(this.addSectionForm.value);
    this.adminService.addSection(this.addSectionForm.value).subscribe(
      (res) => {
        this.addSectionForm.reset();
        this.getAllSections();
        window.location.reload();
      }
    );
  }

  private createForm() {
    this.addSectionForm = this.fb.group({
      Title: ['', Validators.required],
      SectionDescription: ['']
    });
  }

  drop($event: any) {
    // console.log($event.previousIndex, $event.currentIndex);
    moveItemInArray(this.sections, $event.previousIndex, $event.currentIndex);
  }

  private getAllSections() {
    this.adminService.getAllsections().subscribe(
      (res) => {
        this.sections = res;
      }
    );
  }

  onUpdate() {
    this.adminService.updateOrder(this.sections).subscribe(
      (res: []) => {
        this.sections = res;
        alert('Order Updated');
        window.location.reload();
      }
    );
  }

  isEmpty() {
    if (this.addSectionForm.get('Title').value.toString().trim().length === 0) {
      return true;
    }
    return false;
  }
}
