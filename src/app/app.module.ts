import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
 import { FormlyModule } from '@ngx-formly/core';
 import { FormlyMaterialModule } from '@ngx-formly/material';
 import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import {MatButtonModule} from '@angular/material/button';
 import { NgxCsvParserModule } from 'ngx-csv-parser';
 import { HttpClientModule } from '@angular/common/http';
 import {FormlyMatDatepickerModule} from '@ngx-formly/material/datepicker';
 import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxCsvParserModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
    }),
    FormlyMaterialModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatNativeDateModule,
    FormlyMatDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
