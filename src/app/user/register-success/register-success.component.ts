import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-register-success',
  templateUrl: './register-success.component.html',
  styleUrls: ['./register-success.component.css']
})
export class RegisterSuccessComponent implements OnInit {
  flag: boolean;
  sub: Subscription;
  failMessage = '';

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.flag = false;
    this.sub = this.activatedRoute.queryParams.subscribe(params => {
      const token = params.token;
      this.userService.registerSuccess(token).subscribe(next => {
        this.switchStatus();
      }, error => {
        this.failMessage = 'Link hết hạn';
      });
    });
  }

  switchStatus() {
    this.flag = !this.flag;
  }
}
