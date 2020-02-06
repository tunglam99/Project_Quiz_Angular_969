import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StudentClassComponent} from '../student-class/student-class.component';
import {RouterModule, Routes} from '@angular/router';
import {AdminAuthGuard} from '../helper/admin-auth-guard';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSortModule} from '@angular/material/typings/sort';

const routing: Routes = [{
  path: '',
  component: StudentClassComponent,
  canActivate: [AdminAuthGuard]
}];


@NgModule({
  declarations: [
    StudentClassComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    ReactiveFormsModule,
    MatSortModule
  ]
})
export class StudentClassModule { }
