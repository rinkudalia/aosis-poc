import {Component, ViewChild, OnInit, ChangeDetectorRef} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import { FormlyFieldConfig} from '@ngx-formly/core';
import { NgxCSVParserError, NgxCsvParser } from 'ngx-csv-parser';
import {HttpClient} from '@angular/common/http';
import { take } from 'rxjs';
import { AosisMappingService } from './services/aosis-mapping.service';

@Component({  
  selector: 'app-root',
  templateUrl: `./app.component.html`,
  styleUrl: `./app.component.scss`
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  key1: string[]= [];
  label1: string[] = [];
  type1: string[] = [];
  csvRecords: any;
  header: boolean = false;

  constructor(private aosisMappingService: AosisMappingService) { }

  ngOnInit(): void {
    this.getCSVData();
    this.defineControls();
  }

  csvData: string[][]= [];

  getCSVData() {
    this.aosisMappingService.getMapping()
    .pipe((take(1)))
      .subscribe({
        next: (data) =>{
            this.csvData = this.parseCSV(data);
            console.log(this.csvData);
            return data;
        },
        error: (e) => {
          console.error('Error reading the CSV file.', e);
          return e;
        },
        complete: () => console.info('complete') 
      });
  }

  
  csvParsed: string[][] = [];
  parseCSV(data: string): string[][] {
  const rows = data.split('\n'); // Split data into rows
  this.csvParsed= rows.map(row => row.split(','));
  this.defineControls();
  return this.csvParsed;
  }

    defineControls():void {
    this.fields = this.csvParsed.map((row: string[]) => {
      let fieldConfig: FormlyFieldConfig = {
      };
      const rowType = row[1]?.trim();
      console.log(rowType);
      switch (rowType) {
        case 'varchar':
          fieldConfig.type = 'input';
          fieldConfig.key = row[2];
          fieldConfig.props = {
            label: row[0],
            type: 'text',
            required: true,
          };
          break;
        case 'bool':
          fieldConfig.key = row[2];
          fieldConfig.type = 'radio';
          fieldConfig.props =   {
              label: 'Gender',
              options: [
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
              ],
              required: true,
          };
          break;
        case 'checkbox':
          fieldConfig.key= row[2];
          fieldConfig.type = 'multicheckbox';
          fieldConfig.props = {
            label: row[0],
            options: [
              { label: 'MacBook M1', value: 'm1'},
              { label: 'MacBook M2', value: 'm2' },
              { label: 'MacBook M3', value: 'm3' },
            ],
            required: true,
          };
          break;
        case 'datepicker':
          fieldConfig.key = row[2];
          fieldConfig.type = 'datepicker';
          fieldConfig.props = {
            label: 'Datepicker',
            placeholder: 'mm-dd-yyyy',
            format:'mm-dd-yyyy',
            required: true,
            datepickerOptions: {
              min: new Date()
            },
          }
          break;
        case 'email':
          fieldConfig.key = row[2];
          fieldConfig.type = 'input';
          fieldConfig.props = {
            label: row[0],
            type: 'email',
            required: true,
            validation: [Validators.required, Validators.email],
          };
          break;

        // case 'slider':
        //   fieldConfig.type = 'slider';
        //   fieldConfig.key = row[2];
        //   fieldConfig.props = {
        //     label: row[0],
        //     min: 0,
        //     max: 100,
        //     step: 1,
        //     required: true,
        //   };
        //   break;
        default:
         break;
      }
  
      return fieldConfig;
    });
    // this.fields = this.csvParsed.map((row: string[]) => {
    //   let fieldType = 'input'; // Default type
    //   switch (row[1]) {
    //     case ' varchar':
    //       fieldType = 'input';
    //       break;
    //     case ' date':
    //       fieldType = 'date';
    //       break;
    //     case ' checkbox':
    //       fieldType = 'checkbox';
    //       break;
    //     // Add more cases for other data types if needed
    //     default:
    //       fieldType = 'input'; // Default to input for unknown types
    //       break;
    //   }
    //   return {
    //     key: row[2], // Assuming third column as the key
    //     type: fieldType,
    //     templateOptions: {
    //       label: row[0], // First column as label
    //       required: true,
    //     }
    //   };
    // });
  }


//   @ViewChild('fileImportInput') fileImportInput: any;

//   fileChangeListener($event: any): void {
//     console.log("hello");
//     const files = $event.srcElement.files;
//     this.header = (this.header as unknown as string) === 'true' || this.header === true;

//     this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',', encoding: 'utf8' })
//       .pipe().subscribe({
//         next: (result): any => {
//           console.log('Result', result);
//           this.csvRecords = result;
//           this.changedataype(this.csvRecords);
//           return this.csvRecords;
//         },
//         error: (error: NgxCSVParserError): void => {
//           console.log('Error', error);
//         }
//       });
//   }
// private changedataype(csvRecords: any): string{
//   csvRecords.forEach((row: any[], rowIndex: number) => {
//     row.forEach((element: any, columnIndex: number) => {
//   csvRecords[rowIndex][columnIndex] = String(element);
//     });
//   });

//   csvRecords.forEach((row: any[], rowIndex: number) => {
//      this.key1[rowIndex]= csvRecords[rowIndex][2];
//      this.label1[rowIndex]= csvRecords[rowIndex][0];
//      this.type1[rowIndex]= csvRecords[rowIndex][1];
//     console.log(typeof(csvRecords));
//   });
//   return csvRecords;
// }
 
// lparseCsvData(): void {
//   // Convert the CSV string into a two-dimensional array
//   this.csvData = this.csvStringToArray(csvData);
//   console.log('Parsed CSV data:', this.csvData);
// }

// csvStringToArray(csvString: string): any[] {
//   const rows = csvString.split('\n');
//   return rows.map(row => row.split(','));
// }



  form = new FormGroup({});

  model = {}; 
  fields: FormlyFieldConfig[] = [
    // {
    //   key: 'fname',
    //   type: 'input',
    //   templateOptions: {
    //     label: 'First Name',
    //     required: true,
    //   }
    // },
    // {
    //   key: 'lname',
    //   type: 'input',
    //   templateOptions: {
    //     label: 'Last Name',
    //     required: true,
    //   }
    // }, 
    // {
    //   key: 'email',
    //   type: 'input',
    //   templateOptions: {
    //     label: 'Email',
    //     required: true,
    //   }
    // }
  ];

  onSubmit(model: any) {
    console.log(model);
  }
}