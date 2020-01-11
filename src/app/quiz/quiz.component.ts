import {Component, OnInit} from '@angular/core';
import {QuizService} from '../service/quiz.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Quiz} from '../model/quiz';
import {FormControl, FormGroup} from '@angular/forms';
import {Sort} from '@angular/material';
import {NotificationService} from '../service/notification.service';

const FAIL = 'Có lỗi xảy ra trong quá trình thực hiện';
const SUCCESS = 'Thành công';
const NOTIFICATION = 'Thông báo';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quizList: Quiz[];
  quizForm: FormGroup = new FormGroup({
      name: new FormControl(''),
      startedDate: new FormControl(''),
      endedDate: new FormControl('')
    }
  );
  currentQuiz: Quiz;
  isEnableShowStartedDate: boolean;
  isEnableShowEndedDate: boolean;
  name: string;
  startedDate: Date;
  endedDate: Date;

  constructor(private quizService: QuizService,
              private modalService: NgbModal,
              private notificationService: NotificationService) {
    this.isEnableShowEndedDate = false;
    this.isEnableShowStartedDate = false;
  }

  ngOnInit() {
    this.getQuizList();
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, {centered: true});
  }

  close() {
    this.modalService.dismissAll('');
    this.quizForm.reset();
  }

  getQuizList() {
    this.quizService.listQuiz().subscribe(result => {
      this.quizList = result;
    }, error => {
      console.log(error);
    });
  }

  getQuizDetail(id: number) {
    this.quizService.getQuiz(id).subscribe(result => {
      this.currentQuiz = result;
      this.name = this.currentQuiz.name;
      this.startedDate = this.currentQuiz.startedDate;
      this.endedDate = this.currentQuiz.endedDate;
    }, () => {
      this.notificationService.showError('<h5>' + FAIL + '</h5>', NOTIFICATION);
    });
  }

  createQuiz() {
    const quiz: Quiz = {
      id: this.quizForm.value.id,
      name: this.quizForm.value.name,
      startedDate: this.quizForm.value.startedDate,
      endedDate: this.quizForm.value.endedDate
    };
    this.quizService.createQuiz(quiz).subscribe(() => {
      this.quizForm.reset();
      this.quizList.push(quiz);
      this.getQuizList();
      this.notificationService.showSuccess('<h5>' + SUCCESS + '</h5>', NOTIFICATION);
      this.changeShowDatePickerStatusToFalse();
      this.close();
    }, () => {
      this.notificationService.showError('<h5>' + FAIL + '</h5>', NOTIFICATION);
    });
  }

  updateQuiz(id: number) {
    const quiz: Quiz = {
      id: this.currentQuiz.id,
      name: this.quizForm.value.name,
      startedDate: this.quizForm.value.startedDate,
      endedDate: this.quizForm.value.endedDate
    };
    this.quizService.updateQuiz(id, quiz).subscribe(() => {
      this.quizForm.reset();
      this.getQuizList();
      this.notificationService.showSuccess('<h5>' + SUCCESS + '</h5>', NOTIFICATION);
      this.changeShowDatePickerStatusToFalse();
      this.close();
    }, () => {
      this.notificationService.showError('<h5>' + FAIL + '</h5>', NOTIFICATION);
    });
  }

  updateQuizForm(id: number, content) {
    this.getQuizDetail(id);
    this.openVerticallyCentered(content);
  }

  deleteQuiz(id: number) {
    this.quizService.deleteQuiz(id).subscribe(() => {
      this.getQuizList();
      this.notificationService.showSuccess('<h5>' + SUCCESS + '</h5>', NOTIFICATION);
      this.close();
    }, () => {
      this.notificationService.showError('<h5>' + FAIL + '</h5>', NOTIFICATION);
    });
  }

  showDeleteQuizForm(id: number, content) {
    this.getQuizDetail(id);
    this.openVerticallyCentered(content);
  }

  changeShowDatePickerStartStatus() {
    this.isEnableShowStartedDate = !this.isEnableShowStartedDate;
    this.isEnableShowEndedDate = !this.isEnableShowStartedDate;
  }

  changeShowDatePickerEndStatus() {
    this.isEnableShowEndedDate = !this.isEnableShowEndedDate;
    this.isEnableShowStartedDate = !this.isEnableShowEndedDate;
  }

  changeShowDatePickerStatusToFalse() {
    this.isEnableShowStartedDate = false;
    this.isEnableShowEndedDate = false;
  }

  sortQuiz(sort: Sort) {
    const data = this.quizList.slice();
    if (!sort.active || sort.direction === '') {
      this.quizList = data;
      return;
    }
    this.quizList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': {
          return compare(a.id, b.id, isAsc);
        }
        case 'name': {
          return compare(a.name, b.name, isAsc);

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
