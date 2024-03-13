import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AosisMappingService {

  constructor(private httpClient: HttpClient) { }

  getMapping() {
    return this.httpClient.get('assets/csvdata.csv', { responseType: 'text' })
     .pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      }));
  }

  getMockData() {
    return this.httpClient.get('assets/mockData.json', { responseType: 'json' })
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

    return this.httpClient.get('/oasis/poc1/hello-oasis',  { headers, responseType: 'text'})
    .pipe(
     map((data: any) => {
       return data;
     }),
     catchError((error: HttpErrorResponse) => {
       return throwError(() => error);
     }));
  }
}
