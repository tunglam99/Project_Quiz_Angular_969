import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../service/question.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Question} from '../model/question';
import {TypeOfQuestionService} from '../service/type-of-question.service';
import {TypeOfQuestion} from '../model/type-of-question';
import {CategoryService} from '../service/category.service';
import {Category} from '../model/category';
import {AnswerService} from '../service/answer.service';
import {Answer} from '../model/answer';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questionList: Question[] = [];
  typeOfQuestionList: TypeOfQuestion[] = [];
  categoryList: Category[] = [];
  answerList: Answer[] = [];
  questionForm: FormGroup = new FormGroup({
    quiz: new FormControl('', Validators.required),
    correctAnswer: new FormControl('', Validators.required),
    typeOfQuestion: new FormControl(''),
    category: new FormControl('')
  });
  answerForm: FormGroup = new FormGroup({
    content: new FormControl('', Validators.required),
    question: new FormControl('')
  });
  failMessage: string;
  formCreateStatus: boolean;
  showCreateAnswerForm: boolean;

  constructor(private questionService: QuestionService,
              private typeOfQuestionService: TypeOfQuestionService,
              private categoryService: CategoryService,
              private answerService: AnswerService) {
    this.formCreateStatus = false;
    this.showCreateAnswerForm = false;
    this.getQuestionList();
    this.getTypeOfQuestionList();
    this.getCategoryList();
    this.getAnswerList();
  }

  ngOnInit() {
  }

  onClickCreate() {
    this.formCreateStatus = !this.formCreateStatus;
  }

  onClickShowAnswerForm() {
    this.showCreateAnswerForm = !this.showCreateAnswerForm;
  }

  addQuestion() {
    const question: Question = {
      id: this.questionForm.value.id,
      quiz: this.questionForm.value.quiz,
      correctAnswer: this.questionForm.value.correctAnswer,
      typeOfQuestion: {
        id: this.questionForm.value.typeOfQuestion
      },
      category: {
        id: this.questionForm.value.category
      }
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

  getTypeOfQuestionList() {
    this.typeOfQuestionService.listTypeOfQuestion().subscribe(result => {
      this.typeOfQuestionList = result;
    });
  }

  getCategoryList() {
    this.categoryService.listCategory().subscribe(result => {
      this.categoryList = result;
    });
  }

  getAnswerList() {
    this.answerService.listAnswer().subscribe(result => {
      this.answerList = result;
    });
  }

  addAnswer() {
    const answer: Answer = {
      id: this.answerForm.value.id,
      content: this.answerForm.value.content
    };
    this.answerService.createAnswer(answer).subscribe(() => {
      this.answerList.push(answer);
      this.answerForm.reset();
      this.showCreateAnswerForm = false;
    }, () => {
      this.failMessage = 'Tạo mới thất bại';
    });
  }
}
