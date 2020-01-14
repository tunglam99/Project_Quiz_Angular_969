import {Component, OnInit} from '@angular/core';
import {QuizService} from '../service/quiz.service';
import {Quiz} from '../model/quiz';
import {AuthenticationService} from '../service/authentication.service';
import {UserToken} from '../model/user-token';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  quizList: Quiz[] = [];
  currentUser: UserToken;
  quizListByUser: Quiz[] = [];

  constructor(private quizService: QuizService,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(value => {
      this.currentUser = value;
      this.getQuizList();
    });
  }

  ngOnInit() {
  }

  getQuizList() {
    this.quizService.listQuiz().subscribe(result => {
      this.quizList = result;
      for (const quiz of this.quizList) {
        for (const user of quiz.participants) {
          if (user.id === this.currentUser.id) {
            this.quizListByUser.push(quiz);
          }
        }
      }
    }, error => {
      console.log(error);
    });
  }
}
