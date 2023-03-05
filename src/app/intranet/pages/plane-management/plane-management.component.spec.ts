import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaneManagementComponent } from './plane-management.component';

describe('PlaneManagementComponent', () => {
  let component: PlaneManagementComponent;
  let fixture: ComponentFixture<PlaneManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaneManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaneManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
