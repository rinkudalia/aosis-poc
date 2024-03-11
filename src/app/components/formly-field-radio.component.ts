import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
 selector: 'formly-field-radio',
 template: `
 <div *ngIf="fieldOptions" class="col-sm-2 form-element">
 <fieldset class="chkbxrdio-grp">
			<legend class="required"><div style="display: flex;"><span class="field-name">{{label}}</span> <strong class="label-required">(required)</strong></div></legend>
			<div class="form-group radio" *ngFor="let option of fieldOptions; let i = index">
				<label  [for]="'option' + i"><input type="radio" [name]="option.label" [value]="option.key" [id]="'option' + i" data-rule-required="true" /> {{option.value}}</label>
			</div>
		</fieldset>
 </div>
 `,
  styles: `
  legend {
    display: flex;
    flex-direction: column;
    font-size: 16px;
    font-weight: bold
  }
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

  get fieldKey(): string {
    return this.field.key?.toString() ?? 'input';
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
  console.log(this.field.props?.label);
 }
}