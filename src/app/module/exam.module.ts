import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExamComponent} from '../exam/exam.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../helper/auth-guard';
import {DoExamComponent} from '../exam/do-exam/do-exam.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DlDateTimePickerModule} from 'angular-bootstrap-datetimepicker';
import {MatSortModule} from '@angular/material';
import {CountdownModule} from 'ngx-countdown';

const routing: Routes = [{
  path: '',
  component: ExamComponent,
  canActivate: [AuthGuard]
}, {
  path: 'do-exam/:id',
  component: DoExamComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  declarations: [
    ExamComponent,
    DoExamComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    ReactiveFormsModule,
    DlDateTimePickerModule,
    MatSortModule,
    CountdownModule
  ]
})
export class ExamModule {
}
