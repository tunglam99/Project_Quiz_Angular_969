import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TutorAuthGuard} from '../helper/tutor-auth-guard';
import {CategoryModule} from './category.module';
import {QuestionModule} from './question.module';
import {QuizModule} from './quiz.module';

const routes: Routes = [
  {
    path: 'question-management',
    canActivate: [TutorAuthGuard],
    canActivateChild: [TutorAuthGuard],
    loadChildren: () => import('./question.module').then(mod => mod.QuestionModule)
  },
  {
    path: 'quiz-management',
    canActivate: [TutorAuthGuard],
    canActivateChild: [TutorAuthGuard],
    loadChildren: () => import('./quiz.module').then(mod => mod.QuizModule)
  },
  {
    path: 'category-management',
    canActivate: [TutorAuthGuard],
    canActivateChild: [TutorAuthGuard],
    loadChildren: () => import('./category.module').then(mod => mod.CategoryModule)
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CategoryModule,
    QuestionModule,
    QuizModule,
  ]
})
export class TutorModule { }
