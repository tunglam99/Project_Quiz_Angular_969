import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    NavbarComponent
  ]
})
export class SharedModule {
}
