import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicFormComponent } from 'app/components/dynamic-form/dynamic-form.component';
import { WelcomePageComponent } from 'app/components/welcom-page/welcome-page.component';
import { DisplayDataGridComponent } from 'app/components/display-data-grid/display-data.component';

const routes: Routes = [{
  path: '',
  component: DynamicFormComponent
},
{
  path: 'welcome',
  component: WelcomePageComponent
},
{
  path: 'displaydata',
  component: DisplayDataGridComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
