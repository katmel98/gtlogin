import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from '../signup/signup.component';
import { PasswordResetComponent } from '../password-reset/password-reset.component';
import { LoginComponent } from '../login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'passwordReset', component: PasswordResetComponent },
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
