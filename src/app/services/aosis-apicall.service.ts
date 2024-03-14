import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AosisApiService {

  constructor(private httpClient: HttpClient) { }

  fetchapidata(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.httpClient.get('/oasis/poc1/hello-oasis', {headers, responseType: 'text' })
     .pipe(
      map((data: any) => {
        console.log(data);
        return data;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      }));
  }

  
}   
