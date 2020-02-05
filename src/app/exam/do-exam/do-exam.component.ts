import {Component, OnInit} from '@angular/core';
import {Question} from '../../model/question';
import {Subscription} from 'rxjs';
import {QuizService} from '../../service/quiz.service';
import {QuestionService} from '../../service/question.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AnswerService} from '../../service/answer.service';
import {Answer} from '../../model/answer';
import {FormControl, FormGroup} from '@angular/forms';
import {NotificationService} from '../../service/notification.service';
import {CorrectAnswerService} from '../../service/correct-answer.service';
import {ExamService} from '../../service/exam.service';

declare var $;

@Component({
  selector: 'app-do-exam',
  templateUrl: './do-exam.component.html',
  styleUrls: ['./do-exam.component.css']
})
export class DoExamComponent implements OnInit {
  questionList: Question[] = [];
  answerList: Answer[] = [];
  quizId: number;
  examId: number;
  sub: Subscription;
  quizName: string;
  examName: string;
  answerForm: FormGroup = new FormGroup({
    content: new FormControl(''),
    question: new FormControl('')
  });
  isCorrectTime: boolean;
  questionIndex = 0;
  isSubmitted: boolean;
  numberOfCorrectQuestion = 0;
  point = 0;
  checkboxContent = new Set();
  checked: boolean;

  constructor(private quizService: QuizService,
              private examService: ExamService,
              private questionService: QuestionService,
              private answerService: AnswerService,
              private correctAnswerService: CorrectAnswerService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private notificationService: NotificationService) {
    this.isSubmitted = false;
  }

  ngOnInit() {
    this.getQuizDetail();
    $('#aaa').show();
  }

  getQuizDetail() {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.examId = +paramMap.get('id');
      this.examService.getExam(this.examId).subscribe(exam => {
        this.examName = exam.name;
        this.quizService.getQuiz(exam.quiz.id).subscribe(quiz => {
          this.quizName = quiz.name;
          this.quizId = quiz.id;
          this.getQuestionListByQuiz(quiz.id);
          this.doExam(quiz.id);
        });
      });
    });
  }

  getAnswerListByQuestion(question: Question) {
    this.answerService.listAnswerByQuestion(question.id).subscribe(value => {
      this.answerList = value;
      question.answers = this.answerList;
    }, error => {
      console.log(error);
    });
  }

  getQuestionListByQuiz(quizId: number) {
    this.questionService.findAllQuestionByQuiz(quizId).subscribe(result => {
      this.questionList = result;
      for (const question of this.questionList) {
        this.getAnswerListByQuestion(question);
      }
    }, error => {
      console.log(error);
    });
  }

  doExam(examId: number) {
    this.examService.doExam(examId).subscribe(value => {
      this.quizName = value.name;
      this.isCorrectTime = true;
    }, () => {
      this.notificationService.showError('<h5>Chưa đến giờ thi</h5>', 'Thông báo');
      this.router.navigate(['/user/exam']);
    });
  }

  click(questionId) {
    this.answerService.listAnswerByQuestion(questionId).subscribe(value => {
      for (let i = 0; i < value.length; i++) {
        this.checked = (document.getElementById('answerCheckbox' + i) as HTMLInputElement).checked;
        if (this.checked) {
          this.checkboxContent.add((document.getElementById('answerCheckbox' + i) as HTMLInputElement).value);
        }
      }
    });
  }

  next(questionId) {
    this.questionIndex++;
    this.correctAnswerService.listCorrectAnswerByQuestion(questionId).subscribe(listCorrectAnswer => {
      const answer: Answer = {
        id: this.answerForm.value.id,
        content: this.answerForm.value.content,
        question: {
          id: questionId
        }
      };
      this.questionService.getQuestion(questionId).subscribe(question => {
        if (question.typeOfQuestion.id === 2) {
          let count = 0;
          console.log(this.checkboxContent);
          for (const checkboxAnswer of this.checkboxContent) {
            for (const correctAnswer of listCorrectAnswer) {
              if (checkboxAnswer === correctAnswer.content) {
                count++;
              }
            }
          }
          if (count === listCorrectAnswer.length) {
            this.numberOfCorrectQuestion++;
          } else {
            this.numberOfCorrectQuestion += count / listCorrectAnswer.length;
          }
        } else {
          for (const correctAnswer of listCorrectAnswer) {
            if (answer.content === correctAnswer.content) {
              this.numberOfCorrectQuestion++;
            }
          }
        }
        if (this.questionIndex > this.questionList.length - 1) {
          this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
            this.quizId = +paramMap.get('id');
            this.calculatePoint(this.quizId);
          });
          this.isSubmitted = true;
          this.questionIndex = 0;
        }
        this.answerForm.reset();
      });
    });
  }

  previous() {
    this.questionIndex--;
  }

  calculatePoint(quizId: number) {
    this.questionService.findAllQuestionByQuiz(quizId).subscribe(result => {
      this.questionList = result;
      this.point += this.numberOfCorrectQuestion / this.questionList.length * 10;
    });
  }
}
