import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
 selector: 'formly-field-input',
 template: `
  <div class="col-sm-2 form-element form-group">
    <label class="required" [for]="fieldKey"><span class="field-name">{{label}}</span> <span class="label-required" *ngIf="isRequired">(required)</span></label>
    <input  [id]="fieldKey" [name]="fieldKey" type="text" data-rule-minlength="2" required="required" class="border border-primary form-control" [formControl]="formControl" [formlyAttributes]="field">
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
export class FormlyFieldText extends FieldType<FieldTypeConfig> implements OnInit {
    constructor(){
        super();
        
    }

    get fieldKey(): string {
        return this.field.key?.toString() ?? 'input';
    }
    get isRequired() {
        return this.field.props ? this.field.props.required : false;
    }

    get label() {
        return this.field.props ? this.field.props.label : '';
    }
   ngOnInit() {
    console.log(this.field.props?.label);
   }
}