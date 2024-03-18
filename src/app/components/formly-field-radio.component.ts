import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
 selector: 'formly-field-radio',
 template: `
 <div class="col-sm-2 form-element form-group">
   <legend class="label" [title]="tooltip">{{label}} <span class="label-required" *ngIf="isRequired">(required)</span>
   <div class="field-options"> 
    <div *ngFor="let option of fieldOptions" class="option">
           <input type="radio" 
           [title]="tooltip"
           [formControl]="formControl" 
           [formlyAttributes]="field"
           [value]="option.key">
        {{ option.value }}
      </div>
  </div>
  </legend>
 </div> 
 `,
  styles: `
   legend {
    font-size: 16px;
   }

    .field-options {
      display: flex;
      .option {
        margin-right: 15px;
        display: flex;
        font-weight: normal;
        input {
          margin-right: 5px;
        }
      }
    }

    .radio-label {
      margin-left: 5px;
    }

    .form-element {
        display: flex;
        flex-direction: column;
        margin-right: 5px;
    }
    .label {
        font-weight: bolder;
        margin-bottom: 7px;
        font-size: 16px;
    }

    .label-required {
        font-weight: normal;
        font-size: 12px;
        color: gray;
    }
    `
})
export class FormlyFieldRadio extends FieldType<FieldTypeConfig> implements OnInit {
  constructor(){
      super();
      
  }

  get tooltip(): string {
    return this.field.props['tooltip']?.content ?? this.label;
 }

  get isRequired() {
      return this.field.props ? this.field.props.required : false;
  }

  get label() {
      return this.field.props ? this.field.props.label : '';
  }

  get fieldOptions(): any {
    return this.field.props.options ?? [];
  }
 ngOnInit() {
 }
}