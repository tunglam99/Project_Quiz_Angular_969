import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AdminAuthGuard} from '../helper/admin-auth-guard';
import {ExamListComponent} from '../exam/exam-list/exam-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DlDateTimePickerModule} from 'angular-bootstrap-datetimepicker';
import {MatSortModule} from '@angular/material';
import {NgbPopoverModule, NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {ExamDetailComponent} from '../exam/exam-detail/exam-detail.component';

const routes: Routes = [
  {
    path: 'exam-management',
    component: ExamListComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'exam-management/exam-detail/:id',
    component: ExamDetailComponent,
    canActivate: [AdminAuthGuard]
  }
];

@NgModule({
  declarations: [
    ExamListComponent,
    ExamDetailComponent,
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DlDateTimePickerModule,
        MatSortModule,
        RouterModule.forChild(routes),
        NgbTimepickerModule,
        FormsModule,
        NgbPopoverModule
    ]
})
export class AdminModule {
}
