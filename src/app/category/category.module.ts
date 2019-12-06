import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryListComponent} from './category-list/category-list.component';
import {CategoryCreateComponent} from './category-create/category-create.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';

const routing: Routes = [{
  path: '',
  component: CategoryListComponent
}, {
  path: 'create',
  component: CategoryCreateComponent
}];

@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryCreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    FormsModule
  ]
})
export class CategoryModule {
}
