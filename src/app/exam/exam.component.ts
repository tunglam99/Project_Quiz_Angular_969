import {Component, OnInit} from '@angular/core';
import {QuizService} from '../service/quiz.service';
import {Quiz} from '../model/quiz';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  quizList: Quiz[] = [];

  constructor(private quizService: QuizService) {
  }

  ngOnInit() {
    this.getQuizList();
  }

  getQuizList() {
    this.quizService.listQuiz().subscribe(result => {
      this.quizList = result;
    }, error => {
      console.log(error);
    });
  }
}
