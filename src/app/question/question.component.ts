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

  constructor(private questionService: QuestionService,
              private typeOfQuestionService: TypeOfQuestionService,
              private categoryService: CategoryService,
              private answerService: AnswerService,
              private modalService: NgbModal,
              private correctAnswerService: CorrectAnswerService) {
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
      this.failMessage = 'Tạo mới thất bại';
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
      }, () => {
        this.failMessage = 'Lỗi trong quá trình cập nhật';
      });
    });

  }

  getQuestionDetail(id: number) {
    this.questionService.getQuestion(id).subscribe(result => {
      this.currentQuestion = result;
      this.currentQuestionContent = this.currentQuestion.content;
    }, () => {
      this.failMessage = 'Lỗi không tìm thấy câu hỏi có id = ' + id;
    });
  }

  deleteQuestion(id: number) {
    this.questionService.deleteQuestion(id).subscribe(() => {
      this.getQuestionStatusIsTrue();
      this.close();
    }, error => {
      console.log(error);
    });
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
    }, () => {
      this.failMessage = 'Tạo câu trả lời thất bại';
    });
  }

  getAnswer(id: number) {
    this.answerService.getAnswer(id).subscribe(result => {
      this.currentAnswer = result;
      this.currentAnswerContent = this.currentAnswer.content;
    }, error => {
      console.log(error);
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
    }, () => {
      this.failMessage = 'Lỗi trong quá trình cập nhật';
    });
  }

  deleteAnswer(id: number) {
    this.answerService.deleteAnswer(id).subscribe(() => {
      this.getAnswerList(this.questionCurrentId);
    }, () => {
      this.failMessage = 'Lỗi khi xóa câu trả lời có id = ' + id;
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
    });
  }

  getCorrectAnswerList(id: number) {
    this.correctAnswerService.listCorrectAnswerByQuestion(id).subscribe(result => {
      this.correctAnswerList = result;
    });
  }
}
