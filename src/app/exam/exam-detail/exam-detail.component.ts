import {Component, OnInit} from '@angular/core';
import {Question} from '../../model/question';
import {Subscription} from 'rxjs';
import {User} from '../../model/user';
import {Quiz} from '../../model/quiz';
import {QuizService} from '../../service/quiz.service';
import {QuestionService} from '../../service/question.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {NotificationService} from '../../service/notification.service';
import {UserService} from '../../service/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Exam} from '../../model/exam';
import {ExamService} from '../../service/exam.service';
import {FormControl, FormGroup} from '@angular/forms';

const FAIL = 'Có lỗi xảy ra trong quá trình thực hiện';
const SUCCESS = 'Thành công';
const NOTIFICATION = 'Thông báo';

@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.css']
})
export class ExamDetailComponent implements OnInit {
  examId: number;
  sub: Subscription;
  userList: User[];
  currentExam: Exam;
  currentUser: User;
  quizList: Quiz[];
  examForm: FormGroup = new FormGroup({
    quiz: new FormControl()
  });

  constructor(private quizService: QuizService,
              private examService: ExamService,
              private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService,
              private userService: UserService,
              private modalService: NgbModal) {
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, {centered: true});
  }

  close() {
    this.modalService.dismissAll('');
  }

  ngOnInit() {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.examId = +paramMap.get('id');
    });
    this.getUserList();
    this.getQuizList();
  }

  getQuizList() {
    this.quizService.listQuiz().subscribe(value => {
      this.quizList = value;
    });
  }

  getUserList() {
    this.userService.getUserList().subscribe(value => {
      this.userList = value;
    });
  }

  addParticipant(id: number) {
    this.examService.getExam(this.examId).subscribe(exam => {
      this.currentExam = exam;
      this.userService.getUserProfile(id + '').subscribe(participant => {
        this.currentUser = participant;
        for (const user of this.currentExam.participants) {
          if (this.currentUser.id === user.id) {
            return;
          }
        }
        this.quizService.joinQuiz(this.currentUser, this.examId).subscribe(() => {
          this.notificationService.showSuccess('<h5>' + SUCCESS + '</h5>', NOTIFICATION);
        });
      });
    });
  }

  addQuizToExam(examId) {
    this.examService.getExam(examId).subscribe(value => {
      const exam: Exam = {
        id: value.id,
        name: value.name,
        participants: value.participants,
        startedDate: value.startedDate,
        quiz: {
          id: this.examForm.value.quiz
        }
      };
      this.examService.updateExam(examId, exam).subscribe(() => {
        this.notificationService.showSuccess('<h5>' + SUCCESS + '</h5>', NOTIFICATION);
      }, () => {
        this.notificationService.showError('<h5>' + SUCCESS + '</h5>', NOTIFICATION);
      });
    });
    this.close();
  }
}
