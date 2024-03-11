import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AosisApiService {

  constructor(private httpClient: HttpClient) { }

  fetchapidata() {
    return this.httpClient.get('https://api.github.com/users/aneetajohn', { responseType: 'text' })
     .pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      }));
  }

  
}
