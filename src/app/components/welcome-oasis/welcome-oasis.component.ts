import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AosisApiService } from '../../services/aosis-apicall.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-welcome-oasis',
  templateUrl: './welcome-oasis.component.html',
  styleUrls: []
})
export class WelcomeOasisComponent implements OnInit {
  data: any;
    apidata: any;

  constructor(private http: HttpClient, private aosisApiService: AosisApiService) { }
    ngOnInit(): void {
        this.getapiData();
    }

  getapiData(): void {
    this.aosisApiService.fetchapidata()
      .pipe(take(1))
      .subscribe({
        next: (data: any) => {
          this.apidata = data;
          console.log(this.apidata);
          return this.apidata;
        },
        error: (e: any) => {
          console.error('Error reading the api data.', e);
        },
        complete: () => console.info('complete')
      });
  }
  }

