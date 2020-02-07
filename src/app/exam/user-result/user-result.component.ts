import {Component, OnInit} from '@angular/core';
import {ResultService} from '../../service/result.service';
import {Result} from '../../model/result';
import {User} from '../../model/user';
import {AuthenticationService} from '../../service/authentication.service';
import {UserToken} from '../../model/user-token';

@Component({
  selector: 'app-user-result',
  templateUrl: './user-result.component.html',
  styleUrls: ['./user-result.component.css']
})
export class UserResultComponent implements OnInit {
  resultList: Result[] = [];
  currentUser: UserToken;

  constructor(private resultService: ResultService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(user => {
      this.getResultListByUser(user);
    });
  }

  getResultListByUser(user: UserToken) {
    this.resultService.getResultListByUser(user.username).subscribe(resultList => {
      this.resultList = resultList;
    });
  }
}
