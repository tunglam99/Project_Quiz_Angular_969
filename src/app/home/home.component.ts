import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../helper/authentication.service';
import {Router} from '@angular/router';
import {UserToken} from '../model/user-token';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
