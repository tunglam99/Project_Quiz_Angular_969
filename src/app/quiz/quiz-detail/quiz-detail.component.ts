import {Component, OnInit} from '@angular/core';
import {Question} from '../../model/question';
import {QuizService} from '../../service/quiz.service';
import {QuestionService} from '../../service/question.service';
import {Quiz} from '../../model/quiz';
import {Subscription} from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.css']
})
export class QuizDetailComponent implements OnInit {
  questionList: Question[] = [];
  quiz: Quiz;
  sub: Subscription;

  constructor(private quizService: QuizService,
              private questionService: QuestionService,
              private activatedRoute: ActivatedRoute) {
    this.getQuestionList();
  }

  ngOnInit() {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.quizService.getQuiz(id).subscribe(result => {
        this.quiz = result;
      }, error => {
        console.log(error);
      });
    });
  }

  getQuestionList() {
    this.questionService.findAllQuestionByQuiz(this.quiz).subscribe(result => {
      this.questionList = result;
    }, error => {
      console.log(error);
    });
  }
}
