import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AreaSplineChartComponent } from './components/area-spline-chart/area-spline-chart.component';
import { OrgChartComponent } from './components/org-chart/org-chart.component';
import { SalesComponent } from './components/sales/sales.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'area-chart', component: AreaSplineChartComponent},
  {path: 'org-chart', component: OrgChartComponent},
  {path: 'sales', component: SalesComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
