import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
 selector: 'formly-field-date-picker',
 template: `
  <div class="form-element form-group">
    <input type="date" required="true" id="date-form" name="date-form" class="form-control" [formControl]="formControl" [formlyAttributes]="field">
  </div>
 `,
 styles: `
    .form-element {
        display: flex;
        flex-direction: column;
    }
 `,
})
export class FormlyFieldDatePicker extends FieldType<FieldTypeConfig> implements OnInit {
    constructor(){
        super();
        
    }

   get label() {
    return this.field.props? this.field.props.label : '';
   }
   ngOnInit() {
    console.log(this.field.props?.label);
   }
}