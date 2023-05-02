import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss'],
})
export class ThemeSwitchComponent {

  constructor() { }

  currentTheme = 'light-theme';

  toggleTheme() {
    document.body.classList.toggle('dark-theme');

    if (document.body.classList.contains('dark-theme')) {
      localStorage.setItem('theme', 'dark');
      this.currentTheme = 'dark-theme';
    } else {
      localStorage.setItem('theme', 'light');
      this.currentTheme = 'light-theme';
    }
  }

  ngOnInit() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      this.currentTheme = 'dark-theme';
    } else {
      document.body.classList.remove('dark-theme');
      this.currentTheme = 'light-theme';
    }
  }
}
