import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AosisMappingService } from '@app/services/aosis-mapping.service';
import { take } from 'rxjs';

interface Well {
  OBJECTID: number;
  OGF_ID: number;
  WELL_ID: number;
  LICENCE_NUMBER: string;
  WELL_NAME: string;
  OPERATOR: string;
  WELL_TYPE: string;
}

@Component({
  selector: 'app-well-data-grid',
  templateUrl: './display-data.component.html',
  styleUrls: ['./display-data.component.scss']
})
export class DisplayDataGridComponent implements OnInit {
  get getTableHeight() {
    return window.innerHeight - 100;
  }
  wells: Array<any>= [];
  well1: any[] = [];

  constructor(private http: HttpClient,private aosisDataMappingService: AosisMappingService) { }

  ngOnInit(): void {
    this.aosisDataMappingService.getQueryAllWell()
    .pipe((take(1)))
      .subscribe({
        next: (response: any) =>{
            console.log(response.layers[0].fields);
            this.wells= response.layers[0].fields;
            return response;
        },
        error: (e: any) => {
          console.error('Error reading the json file.', e);
          return e;
        },
        complete: () => console.info('complete') 
      });
  }
}

