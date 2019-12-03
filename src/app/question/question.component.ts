import { Component, OnInit } from '@angular/core';
import {QuestionService} from "../service/question.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questionForm: FormGroup = new FormGroup( {
    quizForm: new FormControl('')
  });
successMessage: string;
failMessage: string;
  constructor(private questionService: QuestionService) { }

  ngOnInit() {
  }
  addQuestion(questionForm) {
    this.questionService.createQuestion(questionForm.value).subscribe(() => {
      this.successMessage = 'Tao moi thanh cong';
    }, () => {
      this.failMessage = 'Tao moi that bai';
    });
  }

}
