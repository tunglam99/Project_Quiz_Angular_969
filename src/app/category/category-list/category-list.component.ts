import {Component, OnInit} from '@angular/core';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Sort} from '@angular/material';
import {NotificationService} from '../../service/notification.service';

const FAIL = 'Có lỗi xảy ra trong quá trình thực hiện';
const SUCCESS = 'Thành công';
const NOTIFICATION = 'Thông báo';

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
  currentCategory: Category;
  categoryName: string;

  constructor(private categoryService: CategoryService,
              private modalService: NgbModal,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.getCategoryList();
  }

  showDeleteCategoryForm(id: number, content) {
    this.getCategoryDetail(id);
    this.openVerticallyCentered(content);
  }

  getCategoryList() {
    this.categoryService.listCategory().subscribe(next => {
      this.categoryList = next;
    });
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.notificationService.showSuccess('<h5>' + SUCCESS + '</h5>', NOTIFICATION);
      this.getCategoryList();
      this.close();
    }, () => {
      this.notificationService.showError('<h5>' + FAIL + '</h5>', NOTIFICATION);
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
      this.modalService.dismissAll('');
      this.categoryForm.reset();
      this.categoryList.push(category);
      this.getCategoryList();
      this.close();
      this.notificationService.showSuccess('<h5>' + SUCCESS + '</h5>', NOTIFICATION);
    }, () => {
      this.notificationService.showError('<h5>' + FAIL + '</h5>', NOTIFICATION);
    });
  }

  getCategoryDetail(id: number) {
    this.categoryService.getCategory(id).subscribe(result => {
      this.currentCategory = result;
      this.categoryName = this.currentCategory.name;
    }, () => {
      this.notificationService.showError('<h5>' + FAIL + '</h5>', NOTIFICATION);
    });
  }

  updateCategory(id: number) {
    const category: Category = {
      id: this.currentCategory.id,
      name: this.categoryForm.value.name
    };
    if (this.categoryForm.value.name !== '') {
      this.categoryService.updateCategory(category, id).subscribe(() => {
        this.notificationService.showSuccess('<h5>' + SUCCESS + '</h5>', NOTIFICATION);
        this.categoryForm.reset();
        this.getCategoryList();
        this.close();
      }, () => {
        this.notificationService.showError('<h5>' + FAIL + '</h5>', NOTIFICATION);
      });
      return;
    }
    this.categoryService.getCategory(id).subscribe(value => {
      this.currentCategory = value;
      this.categoryService.updateCategory(this.currentCategory, id).subscribe(() => {
        this.categoryForm.reset();
        this.getCategoryList();
        this.close();
      }, () => {
        this.notificationService.showError('<h5>' + FAIL + '</h5>', NOTIFICATION);
      });
    }, error => {
      this.notificationService.showError('<h5>' + FAIL + '</h5>', NOTIFICATION);
    });
  }

  updateCategoryForm(id: number, content) {
    this.getCategoryDetail(id);
    this.openVerticallyCentered(content);
  }

  sortCategory(sort: Sort) {
    const data = this.categoryList.slice();
    if (!sort.active || sort.direction === '') {
      this.categoryList = data;
      return;
    }
    this.categoryList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': {
          return compare(a.id, b.id, isAsc);
        }
        case 'name': {
          return compare(a.name, b.name, isAsc);

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
