import {Component, OnInit} from '@angular/core';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category.service';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categoryList: Category[];
  categoryForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });
  recycleButton = faTrashAlt;
  failMessage: string;
  successMessage: string;

  constructor(private categoryService: CategoryService,
              private modalService: NgbModal) {
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
      this.failMessage = 'Lỗi khi xóa danh mục có id = ' + id;
    });
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, {centered: true});
  }

  close() {
    this.modalService.dismissAll('');
    this.categoryForm.reset();
  }

  createCategory() {
    const category: Category = {
      id: this.categoryForm.value.id,
      name: this.categoryForm.value.name,
    };
    this.categoryService.createCategory(category).subscribe(() => {
      this.categoryList.push(category);
      this.categoryForm.reset();
      this.getCategoryList();
      this.successMessage = 'Thành công';
    }, () => {
      this.failMessage = 'Thất bại';
    });
  }
}
