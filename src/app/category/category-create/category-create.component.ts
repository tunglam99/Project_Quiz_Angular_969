import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../service/category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  successMessage = '';
  failMessage = '';

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
  }

  createCategory(categoryForm) {
    this.categoryService.createCategory(categoryForm.value).subscribe(() => {
      this.successMessage = 'Tạo Mới Thành Công';
    }, () => {
      this.failMessage = 'Tạo Mới Thất Bại';
    });
  }
}
