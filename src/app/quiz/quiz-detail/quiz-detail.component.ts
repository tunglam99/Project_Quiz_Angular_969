import {Component, OnInit} from '@angular/core';
import {Question} from '../../model/question';
import {QuizService} from '../../service/quiz.service';
import {QuestionService} from '../../service/question.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Sort} from '@angular/material';
import {NotificationService} from '../../service/notification.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

const FAIL = 'Có lỗi xảy ra trong quá trình thực hiện';
const SUCCESS = 'Thành công';
const NOTIFICATION = 'Thông báo';

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
              private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService,
              private modalService: NgbModal) {
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, {centered: true});
  }

  close() {
    this.modalService.dismissAll('');
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

  removeQuestionFromQuiz(id: number) {
    this.questionService.getQuestion(id).subscribe(result => {
      this.currentQuestion = result;
      const question: Question = {
        id: this.currentQuestion.id,
        content: this.currentQuestion.content,
        typeOfQuestion: this.currentQuestion.typeOfQuestion,
        category: this.currentQuestion.category,
        status: this.currentQuestion.status,
        quiz: null
      };
      this.questionService.updateQuestion(id, question).subscribe(() => {
        this.getQuestionList();
        this.notificationService.showSuccess('<h5>' + SUCCESS + '</h5>', NOTIFICATION);
      }, () => {
        this.notificationService.showError('<h5>' + FAIL + '</h5>', NOTIFICATION);
      });
    }, () => {
      this.notificationService.showError('<h5>' + FAIL + '</h5>', NOTIFICATION);
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
