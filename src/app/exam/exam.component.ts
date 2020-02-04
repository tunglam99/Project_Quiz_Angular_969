import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {UserToken} from '../model/user-token';
import {Exam} from '../model/exam';
import {ExamService} from '../service/exam.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  examList: Exam[] = [];
  currentUser: UserToken;
  examListByUser: Exam[] = [];

  constructor(private examService: ExamService,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(value => {
      this.currentUser = value;
      this.getQuizList();
    });
  }

  ngOnInit() {
  }

  getQuizList() {
    this.examService.listExam().subscribe(result => {
      this.examList = result;
      for (const exam of this.examList) {
        for (const user of exam.participants) {
          if (user.id === this.currentUser.id) {
            this.examListByUser.push(exam);
          }
        }
      }
    }, error => {
      console.log(error);
    });
  }
}
