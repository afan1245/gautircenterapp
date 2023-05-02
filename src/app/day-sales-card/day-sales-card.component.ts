import { Component } from '@angular/core';

@Component({
  selector: 'app-day-sales-card',
  templateUrl: './day-sales-card.component.html',
  styleUrls: ['./day-sales-card.component.scss'],
})
export class DaySalesCardComponent {
  originalOrdersTotalTodayAbbr = '1.2K';
  customGoalProgress: number = 0.5;
  customGoalProgressAbbr: any = '50%';
  customGoalAbbr: any = '1.5K';
  customGoal: any = '1.5K';
  isEditable: boolean = false;

  makeEditable() {}

  makeNonEditable() {}

  setCustomGoal(event: any) {}
}
