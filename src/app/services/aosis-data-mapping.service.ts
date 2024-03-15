import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AosisDataMappingService {

  constructor(private httpClient: HttpClient) { }

 
  public getQueryAllWell() {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

    return this.httpClient.get('/oasis/poc1/getQueryAllWells',  { headers, responseType: 'json'})
    .pipe(
     map((data: any) => {
       return data;
     }),
     catchError((error: HttpErrorResponse) => {
       return throwError(() => error);
     }));
  } getMockData() {
    return this.httpClient.get('/oasis/poc1/getQueryAllWells', { responseType: 'json' })
     .pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      }));
  }

 
}
