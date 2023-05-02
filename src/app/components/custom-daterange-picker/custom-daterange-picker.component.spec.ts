import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDaterangePickerComponent } from './custom-daterange-picker.component';

describe('CustomDaterangePickerComponent', () => {
  let component: CustomDaterangePickerComponent;
  let fixture: ComponentFixture<CustomDaterangePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomDaterangePickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomDaterangePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
