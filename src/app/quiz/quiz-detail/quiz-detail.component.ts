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
  quizId: number;
  sub: Subscription;

  constructor(private quizService: QuizService,
              private questionService: QuestionService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.quizId = +paramMap.get('id');
      this.getQuestionList();
    });

  }

  getQuestionList() {
    this.questionService.findAllQuestionByQuiz(this.quizId).subscribe(result => {
      this.questionList = result;
    }, error => {
      console.log(error);
    });
  }
}
