import {Component, OnInit} from '@angular/core';
import {ResultService} from '../../service/result.service';
import {Exam} from '../../model/exam';
import {ExamService} from '../../service/exam.service';

@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.css']
})
export class ExamResultComponent implements OnInit {
  examList: Exam[] = [];

  constructor(private resultService: ResultService,
              private examService: ExamService) {
  }

  ngOnInit() {
    this.getExamList();
  }

  getExamList() {
    this.examService.listExam().subscribe(examList => {
      this.examList = examList;
    });
  }
}
