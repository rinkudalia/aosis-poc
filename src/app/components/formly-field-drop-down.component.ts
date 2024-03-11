// import { Component, OnInit } from '@angular/core';
// import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

// @Component({
//  selector: 'formly-field-dropdown',
//  template: `
//   <div class="col-sm-2 form-element form-group">
//     <label class="label" for="field-input-dropdown">{{label}} <span class="label-required" *ngIf="isRequired">(required)</span></label>
//     <select id="dropdown-form" name="dropdown-form" class="border border-primary form-control" [formControl]="formControl" [formlyAttributes]="field">
//       <option *ngFor="let option of options" [value]="option.value">{{option.label}}</option>
//     </select>
//   </div>
//  `,
//  styles: `
//     .form-element {
//         display: flex;
//         flex-direction: column;
//     }
//     .label {
//         font-weight: bolder;
//         margin-bottom: 5px;
//     }

//     .label-required {
//         font-weight: normal;
//         font-size: 12px;
//         color: gray;
//     }
//  `,
// })
// export class FormlyFieldDropdown extends FieldType<FieldTypeConfig> implements OnInit {
//     options: { label: string, value: any }[] = [];

//     ngOnInit() {
//         if (this.field.templateOptions && this.field.templateOptions.options) {
//             this.options = this.field.templateOptions.options;
//         }
//     }

//     get isRequired() {
//         return this.to.required || false;
//     }

//     get label() {
//         return this.to.label || '';
//     }
// }
