import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AosisDataMappingService } from '@app/services/aosis-data-mapping.service';
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
  
  wells: Array<any>= [];
  well1: any[] = [];

  constructor(private http: HttpClient,private aosisDataMappingService: AosisDataMappingService) { }

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
    //   this.wells = data.layers[0].features.map((feature: { attributes: Well }) => feature.attributes);
    //   this.well1.push(this.wells[0]);
    //   console.log(typeof(this.wells));
    //   console.log(this.wells);
    // });
  }

