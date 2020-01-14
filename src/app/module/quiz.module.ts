import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {QuizComponent} from '../quiz/quiz.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RichTextEditorAllModule} from '@syncfusion/ej2-angular-richtexteditor';
import {QuizDetailComponent} from '../quiz/quiz-detail/quiz-detail.component';
import {AddQuestionToQuizComponent} from '../quiz/add-question-to-quiz/add-question-to-quiz.component';
import {MatSortModule} from '@angular/material';
import {DlDateTimeDateModule, DlDateTimePickerModule} from 'angular-bootstrap-datetimepicker';
import {AdminAuthGuard} from '../helper/admin-auth-guard';

const routing: Routes = [{
  path: '',
  component: QuizComponent,
  canActivate: [AdminAuthGuard]
}, {
  path: 'detail-quiz/:id',
  component: QuizDetailComponent,
  canActivate: [AdminAuthGuard]
}, {
  path: 'detail-quiz/:id/add-question-to-quiz',
  component: AddQuestionToQuizComponent,
  canActivate: [AdminAuthGuard]
}];

@NgModule({
  declarations: [
    QuizComponent,
    QuizDetailComponent,
    AddQuestionToQuizComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RichTextEditorAllModule,
    MatSortModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule
  ]
})
export class QuizModule {
}
