import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {CategoryService} from '../../service/category.service';
import {QuestionService} from '../../service/question.service';
import {Category} from '../../model/category';
import {Subscription} from 'rxjs';
import {Question} from '../../model/question';
import {Sort} from '@angular/material';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  sub: Subscription;
  currentCategory: Category;
  questionList: Question[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService,
              private questionService: QuestionService) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.categoryService.getCategory(id).subscribe(result => {
        this.currentCategory = result;
        this.questionService.findAllQuestionByCategory(this.currentCategory.name).subscribe(value => {
          this.questionList = value;
        });
      }, error => {
        console.log(error);
      });
    });
  }

  ngOnInit() {
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
