import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
 selector: 'formly-field-input',
 template: `
  <div class="form-element form-group">
    <input type="text" required="true" class="form-control" [formControl]="formControl" [formlyAttributes]="field">
  </div>
 `,
 styles: `
    .form-element {
        display: flex;
        flex-direction: column;
    }
 `,
})
export class FormlyFieldInput extends FieldType<FieldTypeConfig> implements OnInit {
    constructor(){
        super();
        
    }

   ngOnInit() {
    console.log(this.field.props?.label);
   }
}