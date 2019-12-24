import {Component, OnInit} from '@angular/core';
import {Question} from '../../model/question';
import {QuizService} from '../../service/quiz.service';
import {QuestionService} from '../../service/question.service';

@Component({
  selector: 'app-add-question-to-quiz',
  templateUrl: './add-question-to-quiz.component.html',
  styleUrls: ['./add-question-to-quiz.component.css']
})
export class AddQuestionToQuizComponent implements OnInit {
  questionList: Question[] = [];

  constructor(private quizService: QuizService,
              private questionService: QuestionService) {
    this.getQuestionList();
  }

  ngOnInit() {
  }
  getQuestionList() {
    this.questionService.findAllQuestionByQuiz().subscribe(result => {
      this.questionList = result;
    }, error => {
      console.log(error);
    });
  }
}
