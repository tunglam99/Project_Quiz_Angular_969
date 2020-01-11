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
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CorrectAnswerService} from '../service/correct-answer.service';
import {CorrectAnswer} from '../model/correct-answer';
import {Sort} from '@angular/material';
import {NotificationService} from '../service/notification.service';

const FAIL = 'Có lỗi xảy ra trong quá trình thực hiện';
const SUCCESS = 'Thành công';
const NOTIFICATION = 'Thông báo';

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
  correctAnswerList: CorrectAnswer[] = [];
  questionForm: FormGroup = new FormGroup({
    content: new FormControl('', Validators.required),
    typeOfQuestion: new FormControl(''),
    category: new FormControl('')
  });
  answerForm: FormGroup = new FormGroup({
    content: new FormControl('', Validators.required),
    question: new FormControl('')
  });
  correctAnswerForm: FormGroup = new FormGroup({
    content: new FormControl(''),
    question: new FormControl('')
  });
  searchForm: FormGroup = new FormGroup({
    category: new FormControl(null),
    typeOfQuestion: new FormControl(null),
    content: new FormControl(null)
  });
  failMessage: string;
  formCreateQuestionStatus: boolean;
  formUpdateQuestionStatus: boolean;
  showCreateAnswerForm: boolean;
  questionCurrentId: number;
  questionStatus: boolean;
  currentQuestion: Question;
  typeOfQuestionFlag: number;
  currentAnswer: Answer;
  updateAnswerStatus: boolean;
  currentQuestionContent: string;
  currentAnswerContent: string;
  currentQuestionCategory: string;
  currentQuestionTypeOfQuestion: string;

  constructor(private questionService: QuestionService,
              private typeOfQuestionService: TypeOfQuestionService,
              private categoryService: CategoryService,
              private answerService: AnswerService,
              private modalService: NgbModal,
              private correctAnswerService: CorrectAnswerService,
              private notificationService: NotificationService) {
    this.formCreateQuestionStatus = false;
    this.formUpdateQuestionStatus = false;
    this.showCreateAnswerForm = false;
    this.updateAnswerStatus = false;
    this.getQuestionList();
    this.getTypeOfQuestionList();
    this.getCategoryList();
    this.getQuestionStatusIsTrue();
  }

  ngOnInit() {
  }

  onClickCreate() {
    this.questionCurrentId = this.questionList.length + 1;
    this.formCreateQuestionStatus = !this.formCreateQuestionStatus;
    this.addQuestion();
    this.questionForm.reset();
  }

  onClickUpdate(id: number) {
    this.getQuestionDetail(id);
    this.getAnswerList(id);
    this.getCorrectAnswerList(id);
    this.formUpdateQuestionStatus = !this.formUpdateQuestionStatus;
    this.questionForm.reset();
  }

  showDeleteQuestionForm(id: number, content) {
    this.getQuestionDetail(id);
    this.openVerticallyCentered(content);
  }

  showDeleteAnswerForm(id: number, content) {
    this.getAnswer(id);
    this.openVerticallyCentered(content);
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, {centered: true});
  }

  close() {
    this.modalService.dismissAll('');
    this.questionForm.reset();
  }

  addQuestion() {
    const question: Question = {
      id: this.questionCurrentId,
      content: this.questionForm.value.content,
      status: false
    };
    this.questionService.createQuestion(question).subscribe(() => {
      this.questionStatusIsTrueList.push(question);
      this.getQuestionList();
    }, () => {
      this.notificationService.showError('<h5>' + FAIL + '</h5>', NOTIFICATION);
    });
    this.getAnswerList(this.questionCurrentId);
  }

  saveQuestionForm() {
    this.questionStatus = true;
  }

  closeQuestionForm() {
    this.questionStatus = false;
  }

  updateQuestion(id: number) {
    this.questionService.getQuestion(id).subscribe(result => {
      this.currentQuestion = result;
      let question: Question = {
        status: this.questionStatus,
        id: this.currentQuestion.id,
        content: this.questionForm.value.content,
      };
      if (this.questionStatus) {
        question = {
          status: this.questionStatus,
          id: this.currentQuestion.id,
          content: this.questionForm.value.content,
          category: {
            id: this.questionForm.value.category
          },
          typeOfQuestion: {
            id: this.questionForm.value.typeOfQuestion
          }
        };
      }
      if (!this.formUpdateQuestionStatus) {
        this.addCorrectAnswer();
      }
      this.questionService.updateQuestion(id, question).subscribe(() => {
        this.formUpdateQuestionStatus = false;
        this.formCreateQuestionStatus = false;
        this.questionForm.reset();
        this.getQuestionStatusIsTrue();
        this.notificationService.showSuccess('<h5>' + SUCCESS + '</h5>', NOTIFICATION);
      }, () => {
        this.notificationService.showError('<h5>' + FAIL + '</h5>', NOTIFICATION);
      });
    });

  }

  getQuestionDetail(id: number) {
    this.questionService.getQuestion(id).subscribe(result => {
      this.currentQuestion = result;
      this.currentQuestionContent = this.currentQuestion.content;
      this.currentQuestionCategory = this.currentQuestion.category.name;
      this.currentQuestionTypeOfQuestion = this.currentQuestion.typeOfQuestion.name;
    }, () => {
      this.notificationService.showError('<h5>' + FAIL + '</h5>', NOTIFICATION);
    });
  }

  deleteQuestion(id: number) {
    this.questionService.deleteQuestion(id).subscribe(() => {
      this.getQuestionStatusIsTrue();
      this.close();
      this.notificationService.showSuccess('<h5>' + SUCCESS + '</h5>', NOTIFICATION);
    }, () => {
      this.notificationService.showError('<h5>' + FAIL + '</h5>', NOTIFICATION);
    });
  }

  getQuestionList() {
    this.questionService.listQuestion().subscribe(result => {
      this.questionList = result;
    });
  }

  sortQuestion(sort: Sort) {
    const data = this.questionStatusIsTrueList.slice();
    if (!sort.active || sort.direction === '') {
      this.questionStatusIsTrueList = data;
      return;
    }
    this.questionStatusIsTrueList = data.sort((a, b) => {
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

  getQuestionStatusIsTrue() {
    this.questionService.listQuestionStatusIsTrue().subscribe(result => {
      this.questionStatusIsTrueList = result;
    });
  }

  findAllQuestionByCategory(category: string) {
    this.questionService.findAllQuestionByCategory(category).subscribe(result => {
      this.questionStatusIsTrueList = result;
    });
  }

  findAllQuestionByTypeOfQuestion(typeOfQuestion: string) {
    this.questionService.findAllQuestionByTypeOfQuestion(typeOfQuestion).subscribe(result => {
      this.questionStatusIsTrueList = result;
    });
  }

  findAllQuestionByTypeOfQuestionAndCategory(typeOfQuestion: string, category: string) {
    this.questionService.findAllQuestionByCategoryAndTypeOfQuestion(typeOfQuestion, category).subscribe(value => {
      this.questionStatusIsTrueList = value;
    });
  }

  findAllQuestionByContent(content: string) {
    this.questionService.findAllQuestionByContent(content).subscribe(value => {
      this.questionStatusIsTrueList = value;
    });
  }

  findAllQuestionByContentAndTypeOfQuestionAndCategory(content: string, typeOfQuestion: string, category: string) {
    this.questionService.findAllQuestionByContentAndTypeOfQuestionAndCategory(content, typeOfQuestion, category).subscribe(value => {
      this.questionStatusIsTrueList = value;
    });
  }

  findAllQuestionByContentAndCategory(content: string, category: string) {
    this.questionService.findAllQuestionByContentAndCategory(content, category).subscribe(value => {
      this.questionStatusIsTrueList = value;
    });
  }

  findAllQuestionByContentAndTypeOfQuestion(content: string, typeOfQuestion: string) {
    this.questionService.findAllQuestionByContentAndTypeOfQuestion(content, typeOfQuestion).subscribe(value => {
      this.questionStatusIsTrueList = value;
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

  getAnswerList(id: number) {
    this.answerService.listAnswerByQuestion(id).subscribe(result => {
      this.answerList = result;
    });
  }

  addAnswer() {
    const answer: Answer = {
      id: this.answerForm.value.id,
      content: this.answerForm.value.content,
      question: {
        id: this.questionCurrentId
      }
    };
    this.answerService.createAnswer(answer).subscribe(() => {
      this.answerList.push(answer);
      this.getAnswerList(this.questionCurrentId);
      this.answerForm.reset();
      this.showCreateAnswerForm = false;
      this.notificationService.showSuccess('<h5>' + SUCCESS + '</h5>', NOTIFICATION);
    }, () => {
      this.notificationService.showError('<h5>' + FAIL + '</h5>', NOTIFICATION);
    });
  }

  getAnswer(id: number) {
    this.answerService.getAnswer(id).subscribe(result => {
      this.currentAnswer = result;
      this.currentAnswerContent = this.currentAnswer.content;
    }, error => {
      this.notificationService.showError('<h5>' + FAIL + '</h5>', NOTIFICATION);
    });
  }

  updateAnswerForm(id: number) {
    this.getAnswer(id);
    this.updateAnswerStatus = !this.updateAnswerStatus;
  }

  updateAnswer(id: number) {
    const answer: Answer = {
      id: this.currentAnswer.id,
      content: this.answerForm.value.content,
      question: {
        id: this.questionCurrentId
      }
    };
    this.answerService.updateAnswer(answer, id).subscribe(() => {
      this.answerForm.reset();
      this.getAnswerList(this.questionCurrentId);
      this.updateAnswerStatus = false;
      this.notificationService.showSuccess('<h5>' + SUCCESS + '</h5>', NOTIFICATION);
    }, () => {
      this.notificationService.showError('<h5>' + FAIL + '</h5>', NOTIFICATION);
    });
  }

  deleteAnswer(id: number) {
    this.answerService.deleteAnswer(id).subscribe(() => {
      this.getAnswerList(this.questionCurrentId);
      this.modalService.dismissAll('');
      this.notificationService.showSuccess('<h5>' + SUCCESS + '</h5>', NOTIFICATION);
    }, () => {
      this.notificationService.showError('<h5>' + FAIL + '</h5>', NOTIFICATION);
    });
  }

  typeOfQuestionForm(id: string) {
    if (id === '1') {
      this.typeOfQuestionFlag = 1;
    } else if (id === '2') {
      this.typeOfQuestionFlag = 2;
    }
  }

  addCorrectAnswer() {
    const correctAnswer: CorrectAnswer = {
      id: this.correctAnswerForm.value.id,
      content: this.correctAnswerForm.value.content,
      question: {
        id: this.questionCurrentId
      }
    };
    this.correctAnswerService.createCorrectAnswer(correctAnswer).subscribe(() => {
      this.correctAnswerForm.reset();
    }, error => {
      console.log(error);
    });
  }

  getCorrectAnswerList(id: number) {
    this.correctAnswerService.listCorrectAnswerByQuestion(id).subscribe(result => {
      this.correctAnswerList = result;
    });
  }

  searchQuestion(category: string, typeOfQuestion: string, content: string) {
    if (this.searchForm.value.category != null && this.searchForm.value.typeOfQuestion != null && this.searchForm.value.content) {
      this.findAllQuestionByContentAndTypeOfQuestionAndCategory(content, typeOfQuestion, category);
    } else if (this.searchForm.value.category != null && this.searchForm.value.typeOfQuestion != null) {
      this.findAllQuestionByTypeOfQuestionAndCategory(typeOfQuestion, category);
    } else if (this.searchForm.value.content != null && this.searchForm.value.category != null) {
      this.findAllQuestionByContentAndCategory(content, category);
    } else if (this.searchForm.value.content != null && this.searchForm.value.typeOfQuestion != null) {
      this.findAllQuestionByContentAndTypeOfQuestion(content, typeOfQuestion);
    } else {
      if (this.searchForm.value.category != null) {
        this.findAllQuestionByCategory(category);
      } else if (this.searchForm.value.typeOfQuestion != null) {
        this.findAllQuestionByTypeOfQuestion(typeOfQuestion);
      } else if (this.searchForm.value.content != null) {
        this.findAllQuestionByContent(content);
      } else {
        this.getQuestionStatusIsTrue();
      }
    }
    this.searchForm.reset();
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
