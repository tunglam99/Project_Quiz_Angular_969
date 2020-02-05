import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ExamService} from '../../service/exam.service';
import {ResultService} from '../../service/result.service';
import {Subscription} from 'rxjs';
import {Exam} from '../../model/exam';
import {Result} from '../../model/result';

@Component({
  selector: 'app-exam-result-detail',
  templateUrl: './exam-result-detail.component.html',
  styleUrls: ['./exam-result-detail.component.css']
})
export class ExamResultDetailComponent implements OnInit {
  sub: Subscription;
  currentExam: Exam;
  examName: string;
  resultList: Result[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private examService: ExamService,
              private resultService: ResultService) {
  }

  ngOnInit() {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const examId = +paramMap.get('id');
      this.examService.getExam(examId).subscribe(exam => {
        this.examName = exam.name;
        this.getResultList(exam);
      });
    });
  }

  getResultList(exam: Exam) {
    this.resultService.getResultListByExam(exam.name).subscribe(resultList => {
      this.resultList = resultList;
    });
  }
}
