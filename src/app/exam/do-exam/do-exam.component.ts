import {Component, OnInit} from '@angular/core';
import {Question} from '../../model/question';
import {Subscription} from 'rxjs';
import {QuizService} from '../../service/quiz.service';
import {QuestionService} from '../../service/question.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AnswerService} from '../../service/answer.service';
import {Answer} from '../../model/answer';

@Component({
  selector: 'app-do-exam',
  templateUrl: './do-exam.component.html',
  styleUrls: ['./do-exam.component.css']
})
export class DoExamComponent implements OnInit {
  questionList: Question[] = [];
  answerList: Answer[] = [];
  quizId: number;
  sub: Subscription;

  constructor(private quizService: QuizService,
              private questionService: QuestionService,
              private answerService: AnswerService,
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
      for (const question of this.questionList) {
        this.getAnswerList(question.id);
      }
    }, error => {
      console.log(error);
    });
  }

  getAnswerList(questionId: number) {
    this.answerService.listAnswerByQuestion(questionId).subscribe(value => {
      this.answerList = value;
    }, error => {
      console.log(error);
    });
  }
}
