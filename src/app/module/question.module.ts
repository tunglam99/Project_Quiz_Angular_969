import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {QuestionComponent} from '../question/question.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AuthGuard} from '../helper/auth-guard';
import {RichTextEditorAllModule} from '@syncfusion/ej2-angular-richtexteditor';

const routing: Routes = [{
  path: '',
  component: QuestionComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  declarations: [
    QuestionComponent
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
export class QuestionModule {
}
