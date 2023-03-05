import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportsManageComponent } from './airports-manage.component';

describe('AirportsManageComponent', () => {
  let component: AirportsManageComponent;
  let fixture: ComponentFixture<AirportsManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirportsManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirportsManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
