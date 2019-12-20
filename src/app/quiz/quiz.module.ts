import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../helper/auth-guard';
import {QuizComponent} from './quiz.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RichTextEditorAllModule} from '@syncfusion/ej2-angular-richtexteditor';

const routing: Routes = [{
  path: '',
  component: QuizComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RichTextEditorAllModule
  ]
})
export class QuizModule { }
