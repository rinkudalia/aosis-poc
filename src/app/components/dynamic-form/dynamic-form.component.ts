import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import { FormlyFieldConfig} from '@ngx-formly/core';
import { take } from 'rxjs';
import { AosisMappingService } from '@app/services/aosis-mapping.service';
import { Router } from '@angular/router';
@Component({  
  selector: 'dynamic-form',
  templateUrl: `./dynamic-form.component.html`,
  styleUrl: `./dynamic-form.component.scss`
})
export class DynamicFormComponent implements OnInit {
  form = new FormGroup({});
  model: any = {}; 
  fields: FormlyFieldConfig[] = [];
  mockData: any;
  emailPattern = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}';

  constructor(private aosisMappingService: AosisMappingService, private router: Router) { }

  ngOnInit(): void {
    this.loadMockData();
  }

  loadMockData() {
    this.aosisMappingService.getMockData()
    .pipe((take(1)))
      .subscribe({
        next: (response: any) =>{
            this.mockData = response.data;
            this.defineControls();
            return response;
        },
        error: (e) => {
          console.error('Error reading the json file.', e);
          return e;
        },
        complete: () => console.info('complete') 
      });
  }

  defineControls():void {
    this.fields = this.mockData.map((row: any) => {
      
      let fieldConfig: FormlyFieldConfig = {
      };
      // set hooks
      fieldConfig.hooks = {
        onInit: (field) => {
          const { form, model, options, props } = field;
        },
      };

      row['attribute'] =  row['attribute']?.toString().trim();
      row['controlType'] = row['controlType']?.toString().trim();
      row['value'] = row['value']?.toString().trim(); 

      // setting key
      fieldConfig.key = row['attribute'];
      // setting default value
      fieldConfig.defaultValue = row['value'];
      
      const rowType = row['controlType'];

      switch (rowType) {
        case 'varchar':
          fieldConfig.type = row['attribute'] === 'gender' ? 'radio' : 'input';
          fieldConfig.key = row['attribute'];
          
          /**
           * TODO: we need to check separate data type for radio button group, right now it is as varchar
           * so we need to add check for gender specifically
           */
          if(row['attribute'] === 'gender') {
            fieldConfig.props =   {
              name: 'Gener',
              label: 'Gender',
              type: 'radio',
              tooltip: {
                content: row['tooltip']
              },  
              options: [{ value: 'Male', key: 'M' }, { value: 'Female', key: 'F' }],
              required: row['validation']?.required
            };
          } else  if(row['attribute'] === 'email') {
            fieldConfig.props =   {
              label: row['label'],
              type: 'email',  
              tooltip: {
                content: row['tooltip']
              },
              required: row['validation']?.required,
              pattern: this.emailPattern
            };
            fieldConfig.validation = {
                messages: {
                    pattern: (error: any, field: FormlyFieldConfig) => `Should have valid email address`
                }
            };
          } else {
            fieldConfig.props = {
              label: row['label'],
              type: 'input',  
              tooltip: {
                content: row['tooltip']
              },
              required: row['validation']?.required,
              minLength: row['validation']?.minLength
            };
          }
        break;
        case 'bool':
          // TODO: add for checkbox
          break;
        case 'date':
          fieldConfig.type = 'date';
          fieldConfig.props = {
            label: row['label'],
            type: 'date',
            placeholder: 'yyyy-mm-dd',
            format:'yyyy-mm-dd',
            tooltip: {
                content: row['tooltip']
              },
            required: row['validation']?.required,
            datepickerOptions: {
             // min: new Date()
            },
          }
          break;
        case 'double':
          fieldConfig.type = 'number';
          fieldConfig.props = {
            label: row['label'],
            type: 'number',
            tooltip: {
                content: row['tooltip']
              },
            required: row['validation']?.required
          };
          break;
        default:
         break;
      }
  
      return fieldConfig;
    });
  }

  onSubmit() {
    if(this.form.invalid) return;
    console.log(this.model);
    if(this.mockData) {
      const outputData = this.mockData.map((row: any) => {
        if(this.model[row.key]) {
          row.value = this.model[row.key];
        }
        row.timestamp = new Date();
        delete row['tooltip'];
        delete row['validation'];
        return row;
      });
      var a = document.createElement('a');
      a.setAttribute('href', 'data:json;charset=utf-u,'+encodeURIComponent(JSON.stringify(outputData)));
      a.setAttribute('download', 'output.json');
      a.click();
    }
  }

  onCancel() {
    this.form.reset();
    this.model = {};
  }
  callApi(){
    this.router.navigate(['/welcome']);
  }

}