import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from './user/register/register.component';
import {LoginComponent} from './user/login/login.component';
import {HomeComponent} from './home/home.component';
import {CategoryListComponent} from './category/category-list/category-list.component';
import {CategoryCreateComponent} from './category/category-create/category-create.component';
import {AuthGuard} from './helper/auth-guard';


const routes: Routes = [{
  path: '',
  component: HomeComponent
  // canActivate: [AuthGuard] // AuthGuard de bao mat
}, {
  path: 'register',
  component: RegisterComponent
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'list-category',
  component: CategoryListComponent,
  canActivate: [AuthGuard]
}, {
  path: 'create-category',
  component: CategoryCreateComponent,
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
