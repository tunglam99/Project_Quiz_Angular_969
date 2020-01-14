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

@Component({
  selector: 'app-do-exam',
  templateUrl: './do-exam.component.html',
  styleUrls: ['./do-exam.component.css']
})
export class DoExamComponent implements OnInit {
  questionList: Question[] = [];
  answerList: Answer[] = [];
  quizId: number;
  sub: Subscription;
  quizName: string;
  answerForm: FormGroup = new FormGroup({
    content: new FormControl(''),
    question: new FormControl('')
  });
  isCorrectTime: boolean;
  questionIndex = 0;
  isSubmitted: boolean;
  numberOfCorrectAnswer = 0;
  point = 0;

  constructor(private quizService: QuizService,
              private questionService: QuestionService,
              private answerService: AnswerService,
              private correctAnswerService: CorrectAnswerService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private notificationService: NotificationService) {
    this.isSubmitted = false;
  }

  ngOnInit() {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.quizId = +paramMap.get('id');
      this.questionService.findAllQuestionByQuiz(this.quizId).subscribe(result => {
        this.questionList = result;
        for (const question of this.questionList) {
          this.answerService.listAnswerByQuestion(question.id).subscribe(value => {
            this.answerList = value;
            question.answers = this.answerList;
          }, error => {
            console.log(error);
          });
        }
      }, error => {
        console.log(error);
      });
      this.quizService.doExam(this.quizId).subscribe(value => {
        this.quizName = value.name;
        this.isCorrectTime = true;
      }, () => {
        this.notificationService.showError('<h5>Chưa đến giờ thi</h5>', 'Thông báo');
        this.router.navigate(['/user/exam']);
      });
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
      for (const correctAnswer of listCorrectAnswer) {
        if (answer.content === correctAnswer.content) {
          this.numberOfCorrectAnswer++;
        }
      }
      if (this.questionIndex > this.questionList.length - 1) {
        this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
          this.quizId = +paramMap.get('id');
          this.questionService.findAllQuestionByQuiz(this.quizId).subscribe(result => {
            this.questionList = result;
            console.log(this.questionList.length);
            console.log(this.numberOfCorrectAnswer);
            this.point += this.numberOfCorrectAnswer / this.questionList.length * 10;
          });
        });
        this.isSubmitted = true;
        this.questionIndex = 0;
      }
    });
  }

  previous() {
    this.questionIndex--;
  }
}
