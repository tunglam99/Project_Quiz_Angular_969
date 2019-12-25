import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryModule} from './category.module';
import {QuestionModule} from './question.module';
import {QuizModule} from './quiz.module';
import {RouterModule, Routes} from '@angular/router';
import {AdminAuthGuard} from '../helper/admin-auth-guard';

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
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CategoryModule,
    QuestionModule,
    QuizModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule {
}
