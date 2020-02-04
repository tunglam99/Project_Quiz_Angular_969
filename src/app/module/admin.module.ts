import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryModule} from './category.module';
import {QuestionModule} from './question.module';
import {QuizModule} from './quiz.module';
import {RouterModule, Routes} from '@angular/router';
import {AdminAuthGuard} from '../helper/admin-auth-guard';
import {ExamListComponent} from '../exam/exam-list/exam-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DlDateTimePickerModule} from 'angular-bootstrap-datetimepicker';
import {MatSortModule} from '@angular/material';
import {NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: 'question-management',
    canActivate: [AdminAuthGuard],
    canActivateChild: [AdminAuthGuard],
    loadChildren: () => import('./question.module').then(mod => mod.QuestionModule)
  },
  {
    path: 'quiz-management',
    canActivate: [AdminAuthGuard],
    canActivateChild: [AdminAuthGuard],
    loadChildren: () => import('./quiz.module').then(mod => mod.QuizModule)
  },
  {
    path: 'category-management',
    canActivate: [AdminAuthGuard],
    canActivateChild: [AdminAuthGuard],
    loadChildren: () => import('./category.module').then(mod => mod.CategoryModule)
  },
  {
    path: 'exam-management',
    component: ExamListComponent,
    canActivate: [AdminAuthGuard]
  }
];

@NgModule({
  declarations: [
    ExamListComponent
  ],
  imports: [
    CommonModule,
    CategoryModule,
    QuestionModule,
    QuizModule,
    ReactiveFormsModule,
    DlDateTimePickerModule,
    MatSortModule,
    RouterModule.forChild(routes),
    NgbTimepickerModule,
    FormsModule
  ]
})
export class AdminModule {
}
