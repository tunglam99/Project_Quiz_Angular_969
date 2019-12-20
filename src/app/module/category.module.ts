import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryListComponent} from '../category/category-list/category-list.component';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthGuard} from '../helper/auth-guard';

const routing: Routes = [{
  path: '',
  component: CategoryListComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  declarations: [
    CategoryListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule
  ]
})
export class CategoryModule {
}
