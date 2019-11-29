import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';
import {User} from '../model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  successMessage = '';
  failMessage = '';
  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    gender: new FormControl(true, Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', Validators.required),
  });

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  register() {
    const username = this.registerForm.value.username;
    const usernameNotEmpty = username.trim() !== '';
    const passwordNotEmpty = username.trim() !== '';
    if (usernameNotEmpty && passwordNotEmpty) {
      const user: User = {
        id: this.registerForm.value.id,
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
        confirmPassword: this.registerForm.value.confirmPassword,
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        gender: this.registerForm.value.gender,
        email: this.registerForm.value.email,
        phoneNumber: this.registerForm.value.phoneNumber,
      };
      this.userService.register(user).subscribe(() => {
        this.successMessage = 'Đăng ký thành công';
        this.registerForm.reset();
      }, () => {
        this.failMessage = 'Đăng ký thất bại';
      });
    }
  }
}
