import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NotificationService} from '../service/notification.service';
import {Sort} from '@angular/material';
import {StudentClass} from '../model/student-class';
import {StudentClassService} from '../service/student-class.service';

const FAIL = 'Có lỗi xảy ra trong quá trình thực hiện';
const SUCCESS = 'Thành công';
const NOTIFICATION = 'Thông báo';

@Component({
  selector: 'app-student-class',
  templateUrl: './student-class.component.html',
  styleUrls: ['./student-class.component.css']
})
export class StudentClassComponent implements OnInit {
  classes: StudentClass[];
  classForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });
  currentClass: StudentClass;
  className: string;

  constructor(private studentClassService: StudentClassService,
              private modalService: NgbModal,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.findAllClasses();
  }

  showDeleteClassForm(id: number, content) {
    this.getClassDetail(id);
    this.openVerticallyCentered(content);
  }

  findAllClasses() {
    this.studentClassService.findAll().subscribe(classes => {
      this.classes = classes;
    });
  }

  deleteClass(id: number) {
    this.studentClassService.deleteClass(id).subscribe(() => {
      this.notificationService.showSuccess('<h5>' + SUCCESS + '</h5>', NOTIFICATION);
      this.findAllClasses();
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
    this.classForm.reset();
  }

  createClass() {
    const studentClass: StudentClass = {
      id: this.classForm.value.id,
      name: this.classForm.value.name,
    };
    this.studentClassService.createClass(studentClass).subscribe(() => {
      this.modalService.dismissAll('');
      this.classForm.reset();
      this.classes.push(studentClass);
      this.findAllClasses();
      this.close();
      this.notificationService.showSuccess('<h5>' + SUCCESS + '</h5>', NOTIFICATION);
    }, () => {
      this.notificationService.showError('<h5>' + FAIL + '</h5>', NOTIFICATION);
    });
  }

  getClassDetail(id: number) {
    this.studentClassService.getClass(id).subscribe(result => {
      this.currentClass = result;
      this.className = this.currentClass.name;
    }, () => {
      this.notificationService.showError('<h5>' + FAIL + '</h5>', NOTIFICATION);
    });
  }

  updateClass(id: number) {
    const studentClass: StudentClass = {
      id: this.currentClass.id,
      name: this.classForm.value.name === null ? this.currentClass.name : this.classForm.value.name
    };
    this.studentClassService.updateClass(studentClass, id).subscribe(() => {
      this.notificationService.showSuccess('<h5>' + SUCCESS + '</h5>', NOTIFICATION);
      this.classForm.reset();
      this.findAllClasses();
      this.close();
    }, () => {
      this.notificationService.showError('<h5>' + FAIL + '</h5>', NOTIFICATION);
    });
  }

  updateClassForm(id: number, content) {
    this.getClassDetail(id);
    this.openVerticallyCentered(content);
  }

  sortClass(sort: Sort) {
    const data = this.classes.slice();
    if (!sort.active || sort.direction === '') {
      this.classes = data;
      return;
    }
    this.classes = data.sort((a, b) => {
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
