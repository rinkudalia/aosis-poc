import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
 selector: 'formly-field-date-picker',
 template: `
  <div class="col-sm-2 form-element form-group">
    <label class="label" [title]="tooltip"  [for]="field.key">{{label}} <span class="label-required" *ngIf="isRequired">(required)</span></label>
    <input [type]="field.props.type" [title]="tooltip" [title]="label" [name]="field.key" class="border border-primary form-control" [formControl]="formControl" [formlyAttributes]="field">
  </div>
 `,
 styles: `
    .form-element {
        display: flex;
        flex-direction: column;
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
 `,
})
export class FormlyFieldDatePicker extends FieldType<FieldTypeConfig> implements OnInit {
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

   ngOnInit() {
   }
}