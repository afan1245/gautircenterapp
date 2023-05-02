import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { APP_CONSTANTS } from './constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {


  constructor(private httpClient: HttpClient) { }

  private _getHttpHeaders(headerConfig: any) {

    return new HttpHeaders({
      'Content-Type': headerConfig && headerConfig.contentType ? headerConfig.contentType : 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    }).set('Auth-Token', headerConfig && headerConfig.token ? headerConfig.token : '')
  }

  public request(requestOption: any): Observable<any> {
    return this.httpClient.request(
      requestOption.method,
      requestOption.url,
      {
        headers: this._getHttpHeaders(requestOption.headerConfig),
        params: requestOption.params,
        body: requestOption.body,
        observe: 'response',
        responseType: requestOption.responseType ? requestOption.responseType : 'json'
      })
      .pipe(
        map(data => this._extractData(data)),
        catchError(data => this._handleError(data))
      );
  }

  private _extractData = (response: any): any => {
    const data = { data: response.body, status: response.status, headers: response.headers} || {};
    return data;
  }

  private _handleError = (error: any): Observable<any> => {

    return throwError(error);

  }

}
