import { Injectable } from '@angular/core';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ControllerService {

  // Node/Express API
  REST_API: string = 'http://localhost:8080/api';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  // Add
  LearnNormal(payload: any): Observable<any> {
    let API_URL = `${this.REST_API}/detect`;
    return this.httpClient.post(API_URL, payload)
      .pipe(
        catchError(this.handleError)
      )
  }

  getFeatureCorrelativeData(payload:any): Observable<any> { 
    let API_URL = `${this.REST_API}/correlative`;
    return this.httpClient.post(API_URL, payload)
      .pipe(
        catchError(this.handleError)
      )
  }
  detectAnomalies(data: string): Observable<any> {
    let API_URL = `${this.REST_API}/detect`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }
 


  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}