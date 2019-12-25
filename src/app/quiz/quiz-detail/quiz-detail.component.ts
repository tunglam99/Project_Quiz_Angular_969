import {Component, OnInit} from '@angular/core';
import {Question} from '../../model/question';
import {QuizService} from '../../service/quiz.service';
import {QuestionService} from '../../service/question.service';
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
  currentQuestion: Question;

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

  getQuestionDetail(id: number) {
    this.questionService.getQuestion(id).subscribe(result => {
      this.currentQuestion = result;
    }, error => {
      console.log(error);
    });
  }

  getQuestionList() {
    this.questionService.findAllQuestionByQuiz(this.quizId).subscribe(result => {
      this.questionList = result;
    }, error => {
      console.log(error);
    });
  }

  removeQuestionFromQuiz(questionId: number) {
    this.getQuestionDetail(questionId);
    if (this.currentQuestion.id != null) {
      console.log(this.currentQuestion);
      const question: Question = {
        id: this.currentQuestion.id,
        content: this.currentQuestion.content,
        typeOfQuestion: this.currentQuestion.typeOfQuestion,
        category: this.currentQuestion.category,
        status: this.currentQuestion.status,
        quiz: null
      };
      this.questionService.updateQuestion(questionId, question).subscribe(() => {
        this.getQuestionList();
      }, error => {
        console.log(error);
      });
    }
  }
}
