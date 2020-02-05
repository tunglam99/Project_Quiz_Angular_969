import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryListComponent} from '../category/category-list/category-list.component';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatSortModule} from '@angular/material';
import {CategoryDetailComponent} from '../category/category-detail/category-detail.component';
import {TutorAuthGuard} from '../helper/tutor-auth-guard';

const routing: Routes = [{
  path: '',
  component: CategoryListComponent,
  canActivate: [TutorAuthGuard]
}, {
  path: 'category-detail/:id',
  component: CategoryDetailComponent,
  canActivate: [TutorAuthGuard]
}];

@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
    MatSortModule
  ]
})
export class CategoryModule {
}
