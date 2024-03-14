import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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
export class DisplayDataGridComponent implements OnInit  {
    displayedColumns: string[] = ['OBJECTID', 'OGF_ID', 'WELL_ID', 'LICENCE_NUMBER', 'WELL_NAME', 'OPERATOR', 'WELL_TYPE'];
    dataSource: MatTableDataSource<Well>;
  
    constructor(private http: HttpClient) {
      this.dataSource = new MatTableDataSource<Well>([]);
    }
  
    ngOnInit(): void {
      this.http.get<any>('assets/testwell.json').subscribe(data => {
        this.dataSource.data = data.layers[0].features.map((feature: { attributes: Well }) => feature.attributes);
      });
    }
}
