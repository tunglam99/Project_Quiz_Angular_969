import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../helper/auth-guard';
import {ExamModule} from './exam.module';
import {UpdateUserProfileComponent} from '../update-user-profile/update-user-profile.component';

const routes: Routes = [
  {
    path: 'exam',
    canActivate: [AuthGuard],
    loadChildren: () => import('./exam.module').then(mod => mod.ExamModule)
  }
];

@NgModule({
  declarations: [
    UpdateUserProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ExamModule,
  ]
})
export class UserModule { }
