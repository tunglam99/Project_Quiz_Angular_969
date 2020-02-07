import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {UserToken} from '../model/user-token';
import {Exam} from '../model/exam';
import {ExamService} from '../service/exam.service';
import {ResultService} from '../service/result.service';
import {Result} from '../model/result';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  examList: Exam[] = [];
  currentUser: UserToken;
  examListByUser: Exam[] = [];
  currentResult: Result;

  constructor(private examService: ExamService,
              private authenticationService: AuthenticationService,
              private resultService: ResultService) {
    this.authenticationService.currentUser.subscribe(value => {
      this.currentUser = value;
      this.getExamList();
    });
  }

  ngOnInit() {
  }

  getExamList() {
    this.examService.listExam().subscribe(result => {
      this.examList = result;
      for (const exam of this.examList) {
        for (const user of exam.participants) {
          if (user.id === this.currentUser.id) {
            this.resultService.getResultByExamAndUser(exam.name, user.username).subscribe(value => {
              this.currentResult = value;
              if (this.currentResult == null) {
                this.examListByUser.push(exam);
              }
            });
          }
        }
      }
    }, error => {
      console.log(error);
    });
  }
}
