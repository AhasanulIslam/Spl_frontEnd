/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Room_TeacherComponent } from './Room_Teacher.component';

describe('Room_TeacherComponent', () => {
  let component: Room_TeacherComponent;
  let fixture: ComponentFixture<Room_TeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Room_TeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Room_TeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
