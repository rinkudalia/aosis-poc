import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
 selector: 'formly-field-input',
 template: `
  <div class="col-sm-2 form-element form-group">
    <label class="label"  [for]="field.key">{{label}} <span class="label-required" *ngIf="isRequired">(required)</span></label>
    <input [name]="field.key" [type]="field.props.type" class="border border-primary form-control" [formControl]="formControl" [formlyAttributes]="field">
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
export class FormlyFieldNumeric extends FieldType<FieldTypeConfig> implements OnInit {
    constructor(){
        super();
        
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