import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTechStackComponent } from './admin-tech-stack.component';

describe('AdminTechStackComponent', () => {
  let component: AdminTechStackComponent;
  let fixture: ComponentFixture<AdminTechStackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTechStackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTechStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
