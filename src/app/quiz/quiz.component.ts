import {Component, OnInit} from '@angular/core';
import {QuizService} from '../service/quiz.service';
import {CategoryService} from '../service/category.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Quiz} from '../model/quiz';
import {FormControl, FormGroup} from '@angular/forms';
import {Category} from '../model/category';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quizList: Quiz[];
  quizForm: FormGroup = new FormGroup({
      name: new FormControl('')
    }
  );
  failMessage: string;

  constructor(private quizService: QuizService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.getQuizList();
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, {centered: true});
  }

  close() {
    this.modalService.dismissAll('');
    this.quizForm.reset();
  }

  getQuizList() {
    this.quizService.listQuiz().subscribe(result => {
      this.quizList = result;
    }, error => {
      console.log(error);
    });
  }

  createQuiz() {
    const quiz: Quiz = {
      id: this.quizForm.value.id,
      name: this.quizForm.value.name,
    };
    this.quizService.createQuiz(quiz).subscribe(() => {
      this.quizForm.reset();
      this.quizList.push(quiz);
      this.getQuizList();
    }, () => {
      this.failMessage = 'Lỗi trong quá trình tạo mới';
    });
  }
}
