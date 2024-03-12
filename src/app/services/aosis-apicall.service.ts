import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AosisApiService {

  constructor(private httpClient: HttpClient) { }

  fetchapidata(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/api/data ', { responseType: 'json' })
     .pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      }));
  }

  
}
