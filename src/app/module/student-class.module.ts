import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StudentClassComponent} from '../student-class/student-class.component';
import {RouterModule, Routes} from '@angular/router';
import {AdminAuthGuard} from '../helper/admin-auth-guard';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSortModule} from '@angular/material';
import {StudentClassDetailComponent} from '../student-class/student-class-detail/student-class-detail.component';

const routing: Routes = [{
  path: '',
  component: StudentClassComponent,
  canActivate: [AdminAuthGuard]
}, {
  path: 'class-detail/:id',
  component: StudentClassDetailComponent,
  canActivate: [AdminAuthGuard]
}];


@NgModule({
  declarations: [
    StudentClassComponent,
    StudentClassDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    ReactiveFormsModule,
    MatSortModule,
    MatSortModule
  ]
})
export class StudentClassModule { }
