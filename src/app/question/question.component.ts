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
import {faEdit, faPlus, faSave, faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questionStatusIsTrueList: Question[] = [];
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
  questionCurrentId: number;
  questionStatus: boolean;
  crossIcon = faTimes;
  plusIcon = faPlus;
  saveIcon = faSave;
  editIcon = faEdit;

  constructor(private questionService: QuestionService,
              private typeOfQuestionService: TypeOfQuestionService,
              private categoryService: CategoryService,
              private answerService: AnswerService) {
    this.formCreateStatus = false;
    this.showCreateAnswerForm = false;
    this.getQuestionList();
    this.getTypeOfQuestionList();
    this.getCategoryList();
    this.getQuestionStatusIsTrue();
  }

  ngOnInit() {
  }

  onClickCreate() {
    this.questionCurrentId = this.questionList.length + 1;
    this.formCreateStatus = !this.formCreateStatus;
  }

  onClickShowAnswerForm() {
    this.showCreateAnswerForm = !this.showCreateAnswerForm;
  }

  addQuestion() {
    const question: Question = {
      id: this.questionCurrentId,
      quiz: this.questionForm.value.quiz,
      status: this.questionStatus,
      correctAnswer: this.questionForm.value.correctAnswer,
      typeOfQuestion: {
        id: this.questionForm.value.typeOfQuestion
      },
      category: {
        id: this.questionForm.value.category
      }
    };
    this.questionService.createQuestion(question).subscribe(() => {
      this.questionStatusIsTrueList.push(question);
      this.getQuestionList();
    }, () => {
      this.failMessage = 'Tạo mới thất bại';
    });
    this.getAnswerList();
  }

  updateQuestion() {
    this.questionStatus = true;

  }

  deleteQuestion() {
    this.questionStatus = false;
  }

  submitQuestion() {
    this.addQuestion();
    this.questionForm.reset();
    this.formCreateStatus = false;
  }

  getQuestionList() {
    this.questionService.listQuestion().subscribe(result => {
      this.questionList = result;
    });
  }

  getQuestionStatusIsTrue() {
    this.questionService.listQuestionStatusIsTrue().subscribe(result => {
      this.questionStatusIsTrueList = result;
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
    this.answerService.listAnswerByQuestion(this.questionCurrentId).subscribe(result => {
      this.answerList = result;
    });
  }

  addAnswer() {
    this.addQuestion();
    const answer: Answer = {
      id: this.answerForm.value.id,
      content: this.answerForm.value.content,
      question: {
        id: this.questionCurrentId
      }
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
