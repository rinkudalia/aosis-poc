import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
 selector: 'formly-field-radio',
 template: `
 <div *ngIf="fieldOptions" class="form-element form-group">
  <div *ngFor="let option of fieldOptions">
    <input type="radio" 
    required="true" 
           [name]="option.label"
           [formControl]="formControl" 
           [formlyAttributes]="field"
           [value]="option.key">
    {{ option.value }}
  </div>
 </div>
 `,
  styles: `
  .form-element {
      display: flex;
      flex-direction: column;
  }`
})
export class FormlyFieldRadio extends FieldType<FieldTypeConfig> implements OnInit {
  constructor(){
      super();
      
  }

  get fieldOptions(): any {
    return this.field.props.options ?? [];
  }
 ngOnInit() {
  console.log(this.field.props?.label);
 }
}