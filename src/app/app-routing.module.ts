import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from './user/register/register.component';
import {LoginComponent} from './user/login/login.component';
import {HomeComponent} from './user/home/home.component';
import {CategoryListComponent} from './category/category-list/category-list.component';
import {CategoryCreateComponent} from './category/category-create/category-create.component';
import {AuthGuard} from './helper/auth-guard';
import {QuestionComponent} from './question/question.component';
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
  path: 'category',
  loadChildren: './category/category.module#CategoryModule',
  canActivate: [AuthGuard]
}, {
  path: 'question',
  loadChildren: './question/question.module#QuestionModule',
  canActivate: [AuthGuard]
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
