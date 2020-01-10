import {Component, OnInit} from '@angular/core';
import {QuizService} from '../service/quiz.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Quiz} from '../model/quiz';
import {FormControl, FormGroup} from '@angular/forms';
import {Sort} from '@angular/material';

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
  failMessage: string;
  successMessage: string;
  currentQuiz: Quiz;
  flagMessage: number;

  constructor(private quizService: QuizService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.flagMessage = 0;
    this.getQuizList();
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, {centered: true});
  }

  close() {
    this.flagMessage = 0;
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
    }, () => {
      this.failMessage = 'Lỗi không tìm thấy đề thi có id = ' + id;
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
      this.successMessage = 'Thành công';
      this.flagMessage = 1;
      this.close();
    }, () => {
      this.flagMessage = 2;
      this.failMessage = 'Lỗi trong quá trình tạo mới';
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
      this.successMessage = 'Thành công';
      this.close();
    }, () => {
      this.flagMessage = 3;
      this.failMessage = 'Lỗi trong quá trình cập nhật';
    });
  }

  updateQuizForm(id: number, content) {
    this.getQuizDetail(id);
    this.openVerticallyCentered(content);
  }

  deleteQuiz(id: number) {
    this.quizService.deleteQuiz(id).subscribe(() => {
      this.getQuizList();
      this.close();
    }, () => {
      this.failMessage = 'Lỗi khi xóa đề thi có id = ' + id;
    });
  }

  showDeleteQuizForm(id: number, content) {
    this.getQuizDetail(id);
    this.openVerticallyCentered(content);
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
