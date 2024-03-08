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

  header: boolean = false;
  emailValidator = Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}');
  
  form = new FormGroup({});

  model = {}; 
  fields: FormlyFieldConfig[] = [];
  csvParsed: string[][] = [];
  csvData: string[][]= [];

  constructor(private aosisMappingService: AosisMappingService) { }

  ngOnInit(): void {
    this.getCSVData();
    this.defineControls();
  }

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

  parseCSV(data: string): string[][] {
    const rows = data.split('\n'); // Split data into rows
    this.csvParsed= rows.map(row => row.split(','));
    this.defineControls();;
    return this.csvParsed;
  }

  defineControls():void {
    this.fields = this.csvParsed.map((row: string[]) => {
      
      let fieldConfig: FormlyFieldConfig = {
      };
      const rowType = row[1]?.trim();
      row[2] =  row[2]?.toString().trim();
      if(row[3]) {
        this.model = {...this.model,
          [row[2]]: row[3].toString().trim()
        };
      }
      console.log(rowType);
      switch (rowType) {
        case 'varchar':
          fieldConfig.type = 'input';
          fieldConfig.key = row[2];
          fieldConfig.hooks = {
            onInit: (field) => {
              const { form, model, options, props } = field;
            },
          };
          fieldConfig.props = {
            label: row[0],
            type: 'input',  
            required: true,
          };
          break;
        case 'bool':
          fieldConfig.key = row[2];
          fieldConfig.type = 'radio';
          fieldConfig.hooks = {
            onInit: (field) => {
              const { form, model, options, props } = field;
            },
          };
          fieldConfig.props =   {
              name: 'Gener',
              label: 'Gender',
              options: [{ value: 'Male', key: 'M' }, { value: 'Female', key: 'F' }],
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
        case 'date':
          fieldConfig.key = row[2];
          fieldConfig.type = 'date';
          fieldConfig.hooks = {
            onInit: (field) => {
              const { form, model, options, props } = field;
            },
          };
          fieldConfig.props = {
            label: row[0],
            placeholder: 'yyyy-mm-dd',
            format:'yyyy-mm-dd',
            required: true,
            datepickerOptions: {
            
             // min: new Date()
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
          };
          fieldConfig.validators = {
            validation: [Validators.required, Validators.email, this.emailValidator],
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

  onSubmit(model: any) {
    console.log(model);
  }
}