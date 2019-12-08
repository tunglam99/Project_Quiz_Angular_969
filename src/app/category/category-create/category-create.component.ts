import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../service/category.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  failMessage = '';

  constructor(private categoryService: CategoryService,
              private router: Router) {
  }

  ngOnInit() {
  }

  createCategory(categoryForm) {
    this.categoryService.createCategory(categoryForm.value).subscribe(() => {
      this.router.navigate(['category']);
    }, () => {
      this.failMessage = 'Tạo Mới Thất Bại';
    });
  }
}
