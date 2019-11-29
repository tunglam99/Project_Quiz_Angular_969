import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
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
    username: new FormControl(''),
    password: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    gender: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
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
