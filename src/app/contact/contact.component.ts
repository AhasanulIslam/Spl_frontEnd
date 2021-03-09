import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {SectionsService} from '../services/sections.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private sectionService: SectionsService) {

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  contactDescription;
  captcha = false;

  contactUsForm;

  resolved(captchaResponse: string) {
    console.log('Resolved captcha with response: ${captchaResponse}');
    this.captcha = true;
}

  ngOnInit() {
    this.createForm();
    // tslint:disable-next-line:max-line-length
    this.contactDescription = 'We love to meet up with fellow travelers and explore areas together. The adventure is not only about the area you are checking out, but the people you are checking it out with.';
  }

  onContactSubmit() {
    this.sectionService.postContactData(this.contactUsForm.value)
    .subscribe(
      (response) => {
        alert('Successfully Submitted');
        this.contactUsForm.reset();
        this.captcha = false;
      },
      error => console.log('Error', error)
    );

  }

  private createForm() {
    this.contactUsForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      phone: ['', Validators.pattern('^[0-9]{10,12}$')]
    });
  }
}
