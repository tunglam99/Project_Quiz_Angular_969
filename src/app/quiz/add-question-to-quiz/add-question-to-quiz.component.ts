import {Component, OnInit} from '@angular/core';
import {Question} from '../../model/question';
import {QuizService} from '../../service/quiz.service';
import {QuestionService} from '../../service/question.service';
import {Quiz} from '../../model/quiz';
import {Subscription} from 'rxjs';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Sort} from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';
import {Category} from '../../model/category';
import {TypeOfQuestion} from '../../model/type-of-question';
import {TypeOfQuestionService} from '../../service/type-of-question.service';
import {CategoryService} from '../../service/category.service';
import {NotificationService} from '../../service/notification.service';

const FAIL = 'Có lỗi xảy ra trong quá trình thực hiện';
const SUCCESS = 'Thành công';
const NOTIFICATION = 'Thông báo';

@Component({
  selector: 'app-add-question-to-quiz',
  templateUrl: './add-question-to-quiz.component.html',
  styleUrls: ['./add-question-to-quiz.component.css']
})
export class AddQuestionToQuizComponent implements OnInit {
  questionList: Question[] = [];
  categoryList: Category[] = [];
  typeOfQuestionList: TypeOfQuestion[] = [];
  quiz: Quiz;
  sub: Subscription;
  currentQuestion: Question;
  searchForm: FormGroup = new FormGroup({
    category: new FormControl(null),
    typeOfQuestion: new FormControl(null),
    content: new FormControl(null)
  });

  constructor(private quizService: QuizService,
              private questionService: QuestionService,
              private activatedRoute: ActivatedRoute,
              private typeOfQuestionService: TypeOfQuestionService,
              private categoryService: CategoryService,
              private notificationService: NotificationService,
              private router: Router) {
  }

  ngOnInit() {
    this.getQuiz();
  }

  getQuiz() {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.quizService.getQuiz(id).subscribe(result => {
        this.quiz = result;
        this.getQuestionList();
        this.getCategoryList();
        this.getTypeOfQuestionList();
      }, error => {
        console.log(error);
      });
    });
  }

  getQuestionList() {
    this.questionService.findAllQuestionByQuizNull().subscribe(result => {
      this.questionList = result;
    }, error => {
      console.log(error);
    });
  }

  addQuestionToQuiz(questionId: number) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const quidId = +paramMap.get('id');
      this.getQuestionAndUpdate(questionId, quidId);
    });
  }

  getQuestionAndUpdate(questionId, quidId) {
    this.questionService.getQuestion(questionId).subscribe(value => {
      this.currentQuestion = value;
      const question: Question = {
        id: this.currentQuestion.id,
        content: this.currentQuestion.content,
        typeOfQuestion: this.currentQuestion.typeOfQuestion,
        category: this.currentQuestion.category,
        status: this.currentQuestion.status,
        quiz: {
          id: quidId,
        }
      };
      this.updateQuestion(questionId, question, quidId);
    }, () => {
      this.notificationService.showError('<h5>' + FAIL + '</h5>', NOTIFICATION);
    });
  }

  updateQuestion(questionId: number, question: Question, quidId: number) {
    this.questionService.updateQuestion(questionId, question).subscribe(() => {
      this.getQuestionList();
      this.router.navigate(['/tutor/quiz-management/detail-quiz/' + quidId]);
      this.notificationService.showSuccess('<h5>' + SUCCESS + '</h5>', NOTIFICATION);
    }, () => {
      this.notificationService.showError('<h5>' + FAIL + '</h5>', NOTIFICATION);
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

  findAllQuestionByQuizIsNullAndContentContaining(content: string) {
    this.questionService.findAllQuestionByQuizIsNullAndContentContaining(content).subscribe(value => {
      this.questionList = value;
    });
  }

  findAllQuestionByQuizIsNullAndCategory(category: string) {
    this.questionService.findAllQuestionByQuizIsNullAndCategory(category).subscribe(value => {
      this.questionList = value;
    });
  }

  findAllQuestionByQuizIsNullAndTypeOfQuestion(typeOfQuestion: string) {
    this.questionService.findAllQuestionByQuizIsNullAndTypeOfQuestion(typeOfQuestion).subscribe(value => {
      this.questionList = value;
    });
  }

  findAllQuestionByQuizIsNullAndCategoryAndTypeOfQuestion(category: string, typeOfQuestion: string) {
    return this.questionService.findAllQuestionByQuizIsNullAndCategoryAndTypeOfQuestion(category, typeOfQuestion).subscribe(value => {
      this.questionList = value;
    });
  }

  findAllQuestionByQuizIsNullAndContentContainingAndCategory(content: string, category: string) {
    this.questionService.findAllQuestionByQuizIsNullAndContentContainingAndCategory(content, category).subscribe(value => {
      this.questionList = value;
    });
  }

  findAllQuestionByQuizIsNullAndContentContainingAndTypeOfQuestion(content: string, typeOfQuestion: string) {
    this.questionService.findAllQuestionByQuizIsNullAndContentContainingAndTypeOfQuestion(content, typeOfQuestion).subscribe(value => {
      this.questionList = value;
    });
  }

  searchQuestion(category: string, typeOfQuestion: string, content: string) {
    if (category != null && typeOfQuestion != null && category != null) {
      this.questionService.findAllQuestionByQuizIsNullAndContentContainingAndCategoryAndTypeOfQuestion(content, category, typeOfQuestion).subscribe(value => {
        this.questionList = value;
      });
    } else {
      if (category != null && typeOfQuestion != null) {
        this.findAllQuestionByQuizIsNullAndCategoryAndTypeOfQuestion(category, typeOfQuestion);
      } else if (category != null && content != null) {
        this.findAllQuestionByQuizIsNullAndContentContainingAndCategory(content, category);
      } else if (content != null && typeOfQuestion != null) {
        this.findAllQuestionByQuizIsNullAndContentContainingAndTypeOfQuestion(content, typeOfQuestion);
      } else {
        if (content != null) {
          return this.findAllQuestionByQuizIsNullAndContentContaining(content);
        } else if (category != null) {
          return this.findAllQuestionByQuizIsNullAndCategory(category);
        } else if (typeOfQuestion != null) {
          return this.findAllQuestionByQuizIsNullAndTypeOfQuestion(typeOfQuestion);
        }
      }
    }
    this.searchForm.reset();
  }

  sortQuestion(sort: Sort) {
    const data = this.questionList.slice();
    if (!sort.active || sort.direction === '') {
      this.questionList = data;
      return;
    }
    this.questionList = data.sort((a, b) => {
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
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
