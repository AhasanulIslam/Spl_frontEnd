import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../services/admin/admin.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-admin-sections',
  templateUrl: './admin-sections.component.html',
  styleUrls: ['./admin-sections.component.scss']
})
export class AdminSectionsComponent implements OnInit {

  sections = ['', 'GIS', 'M&E', 'Web App', 'Mobile App', 'Business Intelligence', 'Consultancy Services'];
  secID: number;
  public data;
  public section;
  public title = '';
  public myForm;

  constructor(private route: ActivatedRoute,
              private adminService: AdminService,
              private router: Router,
              private fb: FormBuilder) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit() {
    this.createForm();
    this.extractId();
    this.getDescription();
    this.getSectionData();
  }
  createForm() {
    this.myForm = this.fb.group({
      Title: [''],
      description: ['']
    });
  }
  extractId() {
    this.route.params.subscribe(
      (params) => this.secID = params.id
    );
  }

  getDescription() {
    this.adminService.getSectionDescription(this.secID).subscribe(
      (res) => {
        this.section = res;
        this.title = this.section.Title;
        this.setFormValue();
      }
    );
  }

  getSectionData() {
    this.adminService.getSectionData(this.secID).subscribe(
      (res) => {
        this.data = res;
      },
    (err) => { throw err; }
    );
  }
  setFormValue() {
    this.myForm.setValue({
      Title: this.section.Title,
      description: this.section.SectionDescription
    });
  }


  onEdit(item: any) {
    this.router.navigate(['edit', item.ItemId], {relativeTo: this.route});
  }

  onAdd() {
    this.router.navigate(['add'], {relativeTo: this.route, state: {
        title: this.title
      }});
  }

  onSubmit() {
    this.section.SectionDescription = this.myForm.get('description').value;
    this.section.Title = this.myForm.get('Title').value;
    this.adminService.updateSection(this.section.Id, this.section).subscribe(
      (res) => {
        this.title = this.section.Title;
        alert('Description updated successfully');
      }
    );
  }

  onDelete(item: any) {
    if ( confirm('Are you sure to delete?') ) {
      this.adminService.deleteData(item.ItemId).subscribe(
        (res) => {

          this.getSectionData();
        },
        (err) => {
          throw  err;
        }
      );
    }
  }

  OnDeleteSection() {
    // tslint:disable-next-line:variable-name
    const _confirm = confirm('Are you sure to delete this section');
    if (_confirm) {
      this.adminService.deleteSection(this.section.Id).subscribe(
        (res) => {
          this.router.navigate(['/admin']).then();
        }
      );
    }
  }
}
