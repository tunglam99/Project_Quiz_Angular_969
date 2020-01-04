import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../helper/auth-guard';
import {ExamModule} from './exam.module';
import {UpdateUserProfileComponent} from '../user/update-user-profile/update-user-profile.component';
import {ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  {
    path: 'exam',
    canActivate: [AuthGuard],
    loadChildren: () => import('./exam.module').then(mod => mod.ExamModule)
  },
  {
    path: 'update-profile/:id',
    component: UpdateUserProfileComponent
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
    ReactiveFormsModule,
  ]
})
export class UserModule {
}
