import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { FormlyFieldConfig} from '@ngx-formly/core';
import { take } from 'rxjs';
import { AosisMappingService } from '@app/services/aosis-mapping.service';
@Component({  
  selector: 'app-root',
  templateUrl: `./app.component.html`,
  styleUrl: `./app.component.scss`
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  private formHeight: number = 0;
  get getFormHeight() {
   return this.formHeight;
  }

  set getFormHeight(value) {
    this.formHeight = value;
  }
  header: boolean = false;
  emailValidator = Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}');
  
  form = new FormGroup({
    fname: new FormControl(),
    lname: new FormControl(),
    email: new FormControl(),
    weight: new FormControl(),
    height: new FormControl(),
    gender: new FormControl()
  });

  model: any = {}; 
  fields: FormlyFieldConfig[] = [];
  csvParsed: string[][] = [];
  csvData: string[][]= [];
  mockData: any;
  constructor(private aosisMappingService: AosisMappingService, private fb: FormBuilder,
    private changeDetectionRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadMockData();
  }

  loadMockData() {
    this.aosisMappingService.getMockData()
    .pipe((take(1)))
      .subscribe({
        next: (response: any) =>{
            this.mockData = response.data;
            console.log(this.mockData);
            this.defineControls();
            this.form = this.fb.group({
              fname: new FormControl('', Validators.required),
              lname:  new FormControl('', Validators.required),
              email:  new FormControl('', Validators.required),
              weight: new FormControl(0, Validators.required),
              height:new FormControl(0, Validators.required),
              gender:  new FormControl('', Validators.required),
            });
            this.formHeight = window.innerHeight - 140;
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
      // setting key
      fieldConfig.key = row['key'];

      row['key'] =  row['key']?.toString().trim();
      // set model with default values
      if(row['value']) {
        this.model = {...this.model,
          [row['key']]: row['value'].toString().trim()
        };
      }
      const rowType = row['type']?.trim();

      switch (rowType) {
        case 'varchar':
          fieldConfig.type = row['key'] === 'gender' ? 'radio' : 'input';
         
          /**
           * TODO: we need to check separate data type for radio button group, right now it is as varchar
           * so we need to add check for gender specifically
           */
          if(row['key'] === 'gender') {
            fieldConfig.props =   {
              name: 'Gener',
              label: 'Gender',
              options: [{ value: 'Male', key: 'M' }, { value: 'Female', key: 'F' }],
              required: true,
          };
          } else {
            fieldConfig.props = {
              label: row['label'],
              type: 'input',  
              required: true,
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
            placeholder: 'yyyy-mm-dd',
            format:'yyyy-mm-dd',
            required: true,
            datepickerOptions: {
             // min: new Date()
            },
          }
          break;
        case 'email':
          fieldConfig.type = 'input';
          fieldConfig.props = {
            label: row['label'],
            type: 'email',
            required: true,
          };
          fieldConfig.validators = {
            validation: [Validators.required, Validators.email, this.emailValidator],
          };
          break;
        case 'double':
          fieldConfig.type = 'number';
          fieldConfig.props = {
            label: row['label'],
            type: 'number',
            required: true,
          };
          break;
        default:
         break;
      }
  
      return fieldConfig;
    });
  }

  onSubmit() {
    if(this.form.invalid){
      let errorHeight: number = document.getElementById('errors-default')?.clientHeight ?? 0;
      if(errorHeight) {
       this.formHeight = (window.innerHeight - errorHeight) - 280;
      }     
      
      this.changeDetectionRef.detectChanges();
      this.changeDetectionRef.markForCheck();
      return;
    } 
    if(this.mockData) {
      this.mockData.map((row: any) => {
        if(this.model[row.key]) {
          row.value = this.model[row.key];
        }
        return row;
      });
      var a = document.createElement('a');
      a.setAttribute('href', 'data:json;charset=utf-u,'+encodeURIComponent(JSON.stringify(this.mockData)));
      a.setAttribute('download', 'output.json');
      a.click();
    }
  }

  onCancel() {
    this.form.reset();
    this.model = {};
  }
}