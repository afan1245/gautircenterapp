import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaySalesCardComponent } from './day-sales-card.component';

describe('DaySalesCardComponent', () => {
  let component: DaySalesCardComponent;
  let fixture: ComponentFixture<DaySalesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaySalesCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaySalesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
