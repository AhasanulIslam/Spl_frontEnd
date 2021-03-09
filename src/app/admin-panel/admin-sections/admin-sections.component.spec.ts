import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSectionsComponent } from './admin-sections.component';

describe('AdminSectionsComponent', () => {
  let component: AdminSectionsComponent;
  let fixture: ComponentFixture<AdminSectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
