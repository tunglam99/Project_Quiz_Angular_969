import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../service/question.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Question} from '../model/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questionList: Question[] = [];
  questionForm: FormGroup = new FormGroup({
    quiz: new FormControl('', Validators.required),
    answerA: new FormControl('', Validators.required),
    answerB: new FormControl('', Validators.required),
    answerC: new FormControl('', Validators.required),
    answerD: new FormControl('', Validators.required),
    correctAnswer: new FormControl('', Validators.required),
  });
  failMessage: string;
  formCreateStatus: boolean;
  constructor(private questionService: QuestionService) {
    this.formCreateStatus = false;
    this.getQuestionList();
  }

  ngOnInit() {
  }
  onClickCreate() {
    this.formCreateStatus = !this.formCreateStatus;
  }
  addQuestion() {
    const question: Question = {
      id: this.questionForm.value.id,
      quiz: this.questionForm.value.quiz,
      answerA: this.questionForm.value.answerA,
      answerB: this.questionForm.value.answerB,
      answerC: this.questionForm.value.answerC,
      answerD: this.questionForm.value.answerD,
      correctAnswer: this.questionForm.value.correctAnswer,
    };
    this.questionService.createQuestion(question).subscribe(() => {
      this.questionList.push(question);
      this.questionForm.reset();
      this.getQuestionList();
      this.formCreateStatus = false;
    }, () => {
      this.failMessage = 'Tạo mới thất bại';
    });
  }

  getQuestionList() {
    this.questionService.listQuestion().subscribe(result => {
      this.questionList = result;
    });
  }
}
