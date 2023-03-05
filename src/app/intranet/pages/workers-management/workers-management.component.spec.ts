import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkersManagementComponent } from './workers-management.component';

describe('WorkersManagementComponent', () => {
  let component: WorkersManagementComponent;
  let fixture: ComponentFixture<WorkersManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkersManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkersManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
