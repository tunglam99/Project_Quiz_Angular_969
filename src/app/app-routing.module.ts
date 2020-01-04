import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from './user/register/register.component';
import {LoginComponent} from './user/login/login.component';
import {HomeComponent} from './user/home/home.component';
import {RegisterSuccessComponent} from './user/register-success/register-success.component';
import {ForgotPasswordComponent} from './user/forgot-password/forgot-password.component';
import {ChangePasswordComponent} from './user/change-password/change-password.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'register',
  component: RegisterComponent
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'register-success',
  component: RegisterSuccessComponent
}, {
  path: 'forgot-password',
  component: ForgotPasswordComponent
}, {
  path: 'new-password/:id',
  component: ChangePasswordComponent
}, {
  path: 'admin',
  loadChildren: () => import('./module/admin.module').then(mod => mod.AdminModule)
}, {
  path: 'user',
  loadChildren: () => import('./module/user.module').then(mod => mod.UserModule)
}, {
  path: '**',
  redirectTo: ''
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
