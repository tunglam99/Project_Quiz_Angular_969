import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../helper/auth-guard';
import {QuizComponent} from '../quiz/quiz.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RichTextEditorAllModule} from '@syncfusion/ej2-angular-richtexteditor';
import {QuizDetailComponent} from '../quiz/quiz-detail/quiz-detail.component';
import {AddQuestionToQuizComponent} from '../quiz/add-question-to-quiz/add-question-to-quiz.component';

const routing: Routes = [{
  path: '',
  component: QuizComponent,
  canActivate: [AuthGuard]
}, {
  path: 'detail-quiz/:id',
  component: QuizDetailComponent,
  canActivate: [AuthGuard]
}, {
  path: 'add-question-to-quiz',
  component: AddQuestionToQuizComponent,
  canActivate: [AuthGuard]
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
    RichTextEditorAllModule
  ]
})
export class QuizModule {
}
