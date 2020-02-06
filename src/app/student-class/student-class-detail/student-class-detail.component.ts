import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {User} from '../../model/user';
import {StudentClass} from '../../model/student-class';
import {UserService} from '../../service/user.service';
import {StudentClassService} from '../../service/student-class.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-student-class-detail',
  templateUrl: './student-class-detail.component.html',
  styleUrls: ['./student-class-detail.component.css']
})
export class StudentClassDetailComponent implements OnInit {
  sub: Subscription;
  studentList: User[] = [];
  currentClass: StudentClass;
  name: string;
  classId: number;

  constructor(private userService: UserService,
              private studentClassService: StudentClassService,
              private activatedRoute: ActivatedRoute) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getStudentClass(id);
    });
  }

  ngOnInit() {
  }

  findAllUserByClass(studentClass: StudentClass) {
    this.userService.getUserListByClass(studentClass.name).subscribe(studentList => {
      this.studentList = studentList;
    }, error => {
      console.log(error);
    });
  }

  getStudentClass(id: number) {
    this.studentClassService.getClass(id).subscribe(studentClass => {
      this.currentClass = studentClass;
      this.name = studentClass.name;
      this.classId = studentClass.id;
      this.findAllUserByClass(studentClass);
    });
  }

  // addStudent(id: number) {
  //   this.studentClassService.getClass(this.classId).subscribe(studentClass => {
  //     this.currentClass = studentClass;
  //     this.userService.getUserProfile(id + '').subscribe(student => {
  //       this.currentUser = student;
  //       for (const user of this.currentExam.participants) {
  //         if (this.currentUser.id === user.id) {
  //           return;
  //         }
  //       }
  //       this.joinExam(this.currentUser, this.examId);
  //     });
  //   });
  // }
}
