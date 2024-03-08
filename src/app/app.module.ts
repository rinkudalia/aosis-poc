import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
 import { FormlyModule } from '@ngx-formly/core';
 import { NgxCsvParserModule } from 'ngx-csv-parser';
 import { HttpClientModule } from '@angular/common/http';
import { FormlyFieldText } from './components/formly-field-text.component';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyFieldRadio } from './components/formly-field-radio.component';
import { FormlyBootstrapMultiCheckboxModule } from '@ngx-formly/bootstrap/multicheckbox';
import { FormlyFieldDatePicker } from './components/formly-field-date-picker.component';
import { FormlyBootstrapFormFieldModule } from '@ngx-formly/bootstrap/form-field';
import { FormlyFieldNumeric } from './components/formly-field-numetic.component';

@NgModule({
  declarations: [
    AppComponent,
    FormlyFieldText,
    FormlyFieldRadio,
    FormlyFieldDatePicker,
    FormlyFieldNumeric
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxCsvParserModule,
    BrowserModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
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
