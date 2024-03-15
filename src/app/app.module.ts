import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'app/app-routing.module';
import { AppComponent } from 'app/app.component';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { HttpClientModule } from '@angular/common/http';
import { FormlyFieldText } from 'app/components/formly-field-text.component';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyFieldRadio } from 'app/components/formly-field-radio.component';
import { FormlyBootstrapMultiCheckboxModule } from '@ngx-formly/bootstrap/multicheckbox';
import { FormlyFieldDatePicker } from 'app/components/formly-field-date-picker.component';
import { FormlyBootstrapFormFieldModule } from '@ngx-formly/bootstrap/form-field';
import { FormlyFieldNumeric } from 'app/components/formly-field-numetic.component';
import { DynamicFormComponent } from 'app/components/dynamic-form/dynamic-form.component';
import { WelcomePageComponent } from 'app/components/welcom-page/welcome-page.component';
import { DisplayDataGridComponent } from './components/display-data-grid/display-data.component';

export function minLengthValidationMessage(error: any, field: FormlyFieldConfig) {
  return `Should have atleast ${field.props?.minLength} characters`;
}

@NgModule({
  declarations: [
    AppComponent,
    FormlyFieldText,
    FormlyFieldRadio,
    FormlyFieldDatePicker,
    FormlyFieldNumeric,
    DynamicFormComponent,
    WelcomePageComponent,
    DisplayDataGridComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
        { name: 'minLength', message: minLengthValidationMessage }
      ],
      types: [
        { name: 'input', component: FormlyFieldText },
        { name: 'number', component: FormlyFieldNumeric },
        { name: 'radio', component: FormlyFieldRadio },
        { name: 'date', component: FormlyFieldDatePicker,  wrappers: ['form-field'],
        defaultOptions: {
          templateOptions: {
            datepickerOptions: {}
          }
        } },
      ],
    }),
    FormlyBootstrapMultiCheckboxModule,
    FormlyBootstrapFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
