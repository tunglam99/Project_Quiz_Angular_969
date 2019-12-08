import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {QuestionComponent} from './question.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

const routing: Routes = [{
  path: '',
  component: QuestionComponent
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
        FontAwesomeModule
    ]
})
export class QuestionModule { }
