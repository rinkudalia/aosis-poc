import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
 selector: 'formly-field-radio',
 template: `
 <div *ngIf="fieldOptions" class="col-sm-2 form-element form-group">
 <label class="label" [title]="tooltip" [for]="field.key">{{label}} <span class="label-required" *ngIf="isRequired">(required)</span></label>
 <div class="field-options"> 
    <div *ngFor="let option of fieldOptions" class="option">
        <input type="radio" class="border border-primary"
              [name]="option.label"
              [formControl]="formControl" 
              [formlyAttributes]="field"
              [value]="option.key"
              [checked]="field.defaultValue"
              [title]="tooltip"
              [id]="option.key">
        <span class="radio-label">{{ option.value }}</span>
      </div>
  </div>
 </div>
 `,
  styles: `
    .field-options {
      display: flex;
      .option {
        margin-right: 15px;
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
        margin-bottom: 5px;
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