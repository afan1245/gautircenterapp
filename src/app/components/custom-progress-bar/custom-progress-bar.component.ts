import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-progress-bar',
  templateUrl: './custom-progress-bar.component.html',
  styleUrls: ['./custom-progress-bar.component.scss'],
})
export class CustomProgressBarComponent {
  @Input() customGoalProgress = 0;
  progress = this.customGoalProgress + '%';

  constructor() {
    console.log(this.progress);
  }
}
