import {Component, ViewChild, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import { FormlyFieldConfig} from '@ngx-formly/core';
import { NgxCSVParserError, NgxCsvParser } from 'ngx-csv-parser';
import * as csvData  from '../../assets/csvdata.csv';

@Component({  
  selector: 'app-root',
  templateUrl: `./app.component.html`,
  styleUrl: `./app.component.scss`
})
export class AppComponent {
  csvData: any[]=[];
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  key1: string[]= [];
  label1: string[] = [];
  type1: string[] = [];
  csvRecords: any;
  header: boolean = false;

  constructor(private ngxCsvParser: NgxCsvParser) {
  }

  @ViewChild('fileImportInput') fileImportInput: any;

  fileChangeListener($event: any): void {
    console.log("hello");
    const files = $event.srcElement.files;
    this.header = (this.header as unknown as string) === 'true' || this.header === true;

    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',', encoding: 'utf8' })
      .pipe().subscribe({
        next: (result): any => {
          console.log('Result', result);
          this.csvRecords = result;
          this.changedataype(this.csvRecords);
          return this.csvRecords;
        },
        error: (error: NgxCSVParserError): void => {
          console.log('Error', error);
        }
      });
  }
private changedataype(csvRecords: any): string{
  csvRecords.forEach((row: any[], rowIndex: number) => {
    row.forEach((element: any, columnIndex: number) => {
  csvRecords[rowIndex][columnIndex] = String(element);
    });
  });

  csvRecords.forEach((row: any[], rowIndex: number) => {
     this.key1[rowIndex]= csvRecords[rowIndex][2];
     this.label1[rowIndex]= csvRecords[rowIndex][0];
     this.type1[rowIndex]= csvRecords[rowIndex][1];
    console.log(typeof(csvRecords));
  });
  return csvRecords;
}
 
lparseCsvData(): void {
  // Convert the CSV string into a two-dimensional array
  this.csvData = this.csvStringToArray(csvData);
  console.log('Parsed CSV data:', this.csvData);
}

csvStringToArray(csvString: string): any[] {
  const rows = csvString.split('\n');
  return rows.map(row => row.split(','));
}

  form = new FormGroup({});

  model = {}; 
  fields: FormlyFieldConfig[] = [
    {
      key: 'fname',
      type: 'input',
      templateOptions: {
        label: 'First Name',
        required: true,
      }
    },
    {
      key: 'lname',
      type: 'input',
      templateOptions: {
        label: 'Last Name',
        required: true,
      }
    }, 
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email',
        required: true,
      }
    }
  ];

  onSubmit(model: any) {
    console.log(model);
  }
}