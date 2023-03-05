import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAvsComponent } from './add-avs.component';

describe('AddAvsComponent', () => {
  let component: AddAvsComponent;
  let fixture: ComponentFixture<AddAvsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAvsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAvsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
