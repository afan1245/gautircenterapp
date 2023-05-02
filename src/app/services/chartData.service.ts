import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request.service';
import { APP_CONSTANTS } from 'src/app/constants';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  dataArray = new Subject<Array<any>>();

  constructor(
    private httpClient: HttpClient,
    private httpReqService: HttpRequestService,
    private router: Router
  ) {}

  public getData(year: any) {
    const url = `${environment.SERVICE_APIS.ORIGINAL_TOTAL}?year=${year}`;
    return this.httpClient.get<any[]>(url);
  }

  public getOrderTotalForRange(start_date: any, end_date: any) {
     const url = `${environment.SERVICE_APIS.ORIGINAL_TOTAL}?start_date=${start_date}&&end_date=${end_date}`;
    return this.httpClient.get<any[]>(url);
  }

  public getOrderTotalForYear(year: any) {
    const url = `${environment.SERVICE_APIS.ORIGINAL_ORDER_TOTAL_BY_MONTH}?forYear=${year}`;
    return this.httpClient.get<any[]>(url);
  }

  public getOrderTotalYears() {
    const url = `${environment.SERVICE_APIS.ORIGINAL_ORDER_TOTAL_BY_YEAR}`;
    return this.httpClient.get<any[]>(url);
  }

  public getOrderTotalByDay(year: any, month: any) {
    const url = `${environment.SERVICE_APIS.ORIGINAL_ORDER_TOTAL_BY_DAY}?year=${year}&month=${month}`;
    return this.httpClient.get<any[]>(url);
  }

  public getOrderTotalByHour(year: any, month: any, day: any) {
    const url = `${environment.SERVICE_APIS.ORIGINAL_ORDER_TOTAL_BY_HOUR}?year=${year}&month=${month}&day=${day}`;
    return this.httpClient.get<any[]>(url);
  }

  // public getTodaysOrderTotal(year: any, month: any, day: any) {
  //   const url = `${environment.SERVICE_APIS.ORIGINAL_ORDER_TOTAL_BY_HOUR}?year=2023&month=3&day=31`;
  //   return this.httpClient.get<any[]>(url);
  // }

  public getTodaysOrderTotal() {
    console.log("first")
    const url = `${environment.SERVICE_APIS.ORIGINAL_TOTAL}?start_date=2023-01-31&&end_date=2023-01-31`;
    return this.httpClient.get<any[]>(url);
  }

  public getOrgChartData() {
    console.log("orgchart")
    const url = `${environment.SERVICE_APIS.ORG_CHART}`;
    return this.httpClient.get<any[]>(url);
  }

  // public getData(): Observable<any[]>  {
  //   const requestBody = {
  //     columns:["INVOICED_LINE_TOTAL"]
  //   };

  //   return this.httpClient.post<any[]>(environment.SERVICE_APIS.ORIGINAL_TOTAL + 'include', requestBody)
  // }
}
