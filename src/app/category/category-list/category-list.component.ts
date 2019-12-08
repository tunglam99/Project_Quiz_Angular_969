import {Component, OnInit} from '@angular/core';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category.service';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categoryList: Category[];
  backButton = faArrowLeft;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.getCategoryList();
  }

  getCategoryList() {
    this.categoryService.listCategory().subscribe(next => {
      this.categoryList = next;
    });
  }
  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.getCategoryList();
    }, () => {
      console.log('Lỗi khi xóa danh mục có id = ' + id);
    });
  }
}
