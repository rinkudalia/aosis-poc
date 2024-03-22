import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'envrionments/envrionment';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AosisMappingService {

  private baseUrl = location.host?.includes('localhost') ? '' : `${environment.baseUrl}`; 
  constructor(private httpClient: HttpClient) { }

  getMockData() {
    return this.httpClient.get(`assets/mockData.json`, { responseType: 'json' })
     .pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      }));
  }

  public getWelcomePage() {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

    return this.httpClient.get(`${this.baseUrl}/oasis/poc1/hello-oasis`,  { headers, responseType: 'text'})
    .pipe(
     map((data: any) => {
       return data;
     }),
     catchError((error: HttpErrorResponse) => {
       return throwError(() => error);
     }));
  }

  public getToken() {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

    return this.httpClient.get(`${this.baseUrl}/oasis/poc1/getTokenAPI`,  { headers, responseType: 'json'})
    .pipe(
     map((data: any) => {
       return data;
     }),
     catchError((error: HttpErrorResponse) => {
       return throwError(() => error);
     }));
  }

  public getQueryAllWell() {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

    return this.httpClient.get(`${this.baseUrl}/oasis/poc1/getQueryAllWells`,  { headers, responseType: 'json'})
    .pipe(
     map((data: any) => {
       return data;
     }),
     catchError((error: HttpErrorResponse) => {
       return throwError(() => error);
     }));
  }
}
