import {Component, OnInit} from '@angular/core';
import {Question} from '../../model/question';
import {QuizService} from '../../service/quiz.service';
import {QuestionService} from '../../service/question.service';
import {Quiz} from '../../model/quiz';
import {Subscription} from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Sort} from '@angular/material';

@Component({
  selector: 'app-add-question-to-quiz',
  templateUrl: './add-question-to-quiz.component.html',
  styleUrls: ['./add-question-to-quiz.component.css']
})
export class AddQuestionToQuizComponent implements OnInit {
  questionList: Question[] = [];
  quiz: Quiz;
  sub: Subscription;
  currentQuestion: Question;

  constructor(private quizService: QuizService,
              private questionService: QuestionService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.quizService.getQuiz(id).subscribe(result => {
        this.quiz = result;
        this.getQuestionList();
      }, error => {
        console.log(error);
      });
    });
  }

  getQuestionList() {
    this.questionService.findAllQuestionByQuizNull().subscribe(result => {
      this.questionList = result;
    }, error => {
      console.log(error);
    });
  }

  addQuestionToQuiz(id: number) {
    this.questionService.getQuestion(id).subscribe(result => {
      this.currentQuestion = result;
      const question: Question = {
        id: this.currentQuestion.id,
        content: this.currentQuestion.content,
        typeOfQuestion: this.currentQuestion.typeOfQuestion,
        category: this.currentQuestion.category,
        status: this.currentQuestion.status,
        quiz: {
          id: this.quiz.id,
        }
      };
      this.questionService.updateQuestion(id, question).subscribe(() => {
        this.getQuestionList();
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });
  }

  sortQuestion(sort: Sort) {
    const data = this.questionList.slice();
    if (!sort.active || sort.direction === '') {
      this.questionList = data;
      return;
    }
    this.questionList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': {
          return compare(a.id, b.id, isAsc);
        }
        case 'content': {
          return compare(a.content, b.content, isAsc);
        }
        default: {
          return 0;
        }
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
