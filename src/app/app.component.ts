import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';

@Component({
  selector: 'app-root',
  templateUrl: `./app.component.html`,
  styleUrl: `./app.component.scss`
})
export class AppComponent {
  form = new FormGroup({});

  model = {}; 
  fields: FormlyFieldConfig[] = [
    {
      key: 'fname',
      type: 'input',
      templateOptions: {
        label: 'First Name',
        required: true,
      }
    },
    {
      key: 'lname',
      type: 'input',
      templateOptions: {
        label: 'Last Name',
        required: true,
      }
    }, 
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email',
        required: true,
      }
    }
  ];

  onSubmit(model: any) {
    console.log(model);
  }
}