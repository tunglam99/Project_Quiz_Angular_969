import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NotificationService} from '../../service/notification.service';
import {Sort} from '@angular/material';
import {Exam} from '../../model/exam';
import {ExamService} from '../../service/exam.service';

const FAIL = 'Có lỗi xảy ra trong quá trình thực hiện';
const SUCCESS = 'Thành công';
const NOTIFICATION = 'Thông báo';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {
  examList: Exam[];
  examForm: FormGroup = new FormGroup({
      name: new FormControl(''),
      startedDate: new FormControl(''),
      minutes: new FormControl('')
    }
  );
  currentExam: Exam;
  isEnableShowStartedDate: boolean;
  name: string;
  startedDate: Date;

  constructor(private examService: ExamService,
              private modalService: NgbModal,
              private notificationService: NotificationService) {
    this.isEnableShowStartedDate = false;
  }

  ngOnInit() {
    this.getExamList();
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, {centered: true});
  }

  close() {
    this.modalService.dismissAll('');
    this.examForm.reset();
  }

  getExamList() {
    this.examService.listExam().subscribe(result => {
      this.examList = result;
    }, error => {
      console.log(error);
    });
  }

  getExamDetail(id: number) {
    this.examService.getExam(id).subscribe(result => {
      this.currentExam = result;
      this.name = this.currentExam.name;
      this.startedDate = this.currentExam.startedDate;
    }, () => {
      this.notificationService.showError('<h5>' + FAIL + '</h5>', NOTIFICATION);
    });
  }

  createExam() {
    const exam: Exam = {
      id: this.examForm.value.id,
      name: this.examForm.value.name,
      startedDate: this.examForm.value.startedDate,
    };
    this.examService.createExam(exam).subscribe(() => {
      this.examForm.reset();
      this.examList.push(exam);
      this.getExamList();
      this.notificationService.showSuccess('<h5>' + SUCCESS + '</h5>', NOTIFICATION);
      this.changeShowDatePickerStatusToFalse();
      this.close();
    }, () => {
      this.notificationService.showError('<h5>' + FAIL + '</h5>', NOTIFICATION);
    });
  }

  updateExam(id: number) {
    const exam: Exam = {
      id: this.currentExam.id,
      name: this.examForm.value.name === null ? this.currentExam.name : this.examForm.value.name,
      startedDate: this.examForm.value.startedDate === null ? this.currentExam.startedDate : this.examForm.value.startedDate,
      quiz: {
        id: this.currentExam.quiz.id
      }
    };
    this.examService.updateExam(id, exam).subscribe(() => {
      this.examForm.reset();
      this.getExamList();
      this.notificationService.showSuccess('<h5>' + SUCCESS + '</h5>', NOTIFICATION);
      this.changeShowDatePickerStatusToFalse();
      this.close();
    }, () => {
      this.notificationService.showError('<h5>' + FAIL + '</h5>', NOTIFICATION);
    });
  }

  updateExamForm(id: number, content) {
    this.getExamDetail(id);
    this.openVerticallyCentered(content);
  }

  deleteExam(id: number) {
    this.examService.deleteExam(id).subscribe(() => {
      this.getExamList();
      this.notificationService.showSuccess('<h5>' + SUCCESS + '</h5>', NOTIFICATION);
      this.close();
    }, () => {
      this.notificationService.showError('<h5>' + FAIL + '</h5>', NOTIFICATION);
    });
  }

  showDeleteExamForm(id: number, content) {
    this.getExamDetail(id);
    this.openVerticallyCentered(content);
  }

  changeShowDatePickerStartStatus() {
    this.isEnableShowStartedDate = !this.isEnableShowStartedDate;
  }

  changeShowDatePickerStatusToFalse() {
    this.isEnableShowStartedDate = false;
  }

  sortExam(sort: Sort) {
    const data = this.examList.slice();
    if (!sort.active || sort.direction === '') {
      this.examList = data;
      return;
    }
    this.examList = data.sort((a, b) => {
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
