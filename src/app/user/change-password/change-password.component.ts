import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user';
import {Subscription} from 'rxjs';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
  });
  user: User;
  token: string;
  sub: Subscription;
  failMessage = '';
  successMessage = '';

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.sub = this.activatedRoute.queryParams.subscribe(params => {
      this.token = params.token;
    });
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      this.userService.getUserProfile(id).subscribe(next => {
        this.user = next;
      }, () => {
        this.failMessage = 'Không tìm thấy user';
      });
    });
  }

  changePassword() {
    const currentUser: User = {
      id: this.user.id,
      username: this.user.username,
      roles: this.user.roles,
      phoneNumber: this.user.phoneNumber,
      email: this.user.email,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      gender: this.user.gender,
      enabled: this.user.enabled,
      password: this.changePasswordForm.value.password,
      confirmPassword: this.changePasswordForm.value.confirmPassword
    };
    this.userService.newPassword(currentUser, currentUser.id, this.token).subscribe(() => {
      this.successMessage = 'Đổi mật khẩu thành công';
      this.router.navigate(['login']);
    }, () => {
      this.failMessage = 'Mật khẩu nhập lại không khớp';
    });
  }
}
