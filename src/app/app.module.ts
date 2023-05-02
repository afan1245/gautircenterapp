import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ColumnChartComponent } from './components/column-chart/column-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { ThemeSwitchComponent } from './components/theme-switch/theme-switch.component';
import { AreaSplineChartComponent } from './components/area-spline-chart/area-spline-chart.component';
import { CustomHeaderComponent } from './components/custom-header/custom-header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OrgChartComponent } from './components/org-chart/org-chart.component';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { CustomModalComponent } from './components/custom-modal/custom-modal.component';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { CustomProgressBarComponent } from './components/custom-progress-bar/custom-progress-bar.component';
import { SalesComponent } from './components/sales/sales.component';
import { DaySalesCardComponent } from './day-sales-card/day-sales-card.component';
import { CustomDaterangePickerComponent } from './components/custom-daterange-picker/custom-daterange-picker.component';
import {
  NgbPaginationModule,
  NgbAlertModule,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ColumnChartComponent,
    BarChartComponent,
    ThemeSwitchComponent,
    AreaSplineChartComponent,
    CustomHeaderComponent,
    SidebarComponent,
    OrgChartComponent,
    LoadingSpinnerComponent,
    CustomModalComponent,
    CustomProgressBarComponent,
    SalesComponent,
    DaySalesCardComponent,
    CustomDaterangePickerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HighchartsChartModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    FontAwesomeModule,
    OrganizationChartModule,
    AngularMyDatePickerModule,
    BrowserAnimationsModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbDatepickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
