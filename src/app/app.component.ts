import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './service/authentication.service';
import {Router} from '@angular/router';
import {UserToken} from './model/user-token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isLogin: boolean;

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }
}
