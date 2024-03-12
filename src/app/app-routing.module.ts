import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { WelcomeOasisComponent } from './components/welcome-oasis/welcome-oasis.component';
const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'welcomeoasis/:parameterName', component: WelcomeOasisComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
