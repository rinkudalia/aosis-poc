import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AosisDataMappingService {

  constructor(private httpClient: HttpClient) { }

 
  getMockData() {
    return this.httpClient.get('assets/testwell.json', { responseType: 'json' })
     .pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      }));
  }

 
}
