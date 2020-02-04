import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExamComponent} from '../exam/exam.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../helper/auth-guard';
import {DoExamComponent} from '../exam/do-exam/do-exam.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ExamListComponent} from '../exam/exam-list/exam-list.component';
import {AdminAuthGuard} from '../helper/admin-auth-guard';
import {DlDateTimePickerModule} from 'angular-bootstrap-datetimepicker';
import {MatSortModule} from '@angular/material';

const routing: Routes = [{
  path: '',
  component: ExamComponent,
  canActivate: [AuthGuard]
}, {
  path: 'do-exam/:id',
  component: DoExamComponent,
  canActivate: [AuthGuard]
}, {
  path: 'list-exam',
  component: ExamListComponent,
  canActivate: [AdminAuthGuard]
}];

@NgModule({
  declarations: [
    ExamComponent,
    DoExamComponent,
    ExamListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    ReactiveFormsModule,
    DlDateTimePickerModule,
    MatSortModule
  ]
})
export class ExamModule {
}
