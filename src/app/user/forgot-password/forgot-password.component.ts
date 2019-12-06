import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  failMessage: string;
  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
  }

  passwordForgot() {
    console.log(this.forgotPasswordForm.value.email);
    this.userService.passwordForgot(this.forgotPasswordForm.value).subscribe(() => {
      this.forgotPasswordForm.reset();
      this.router.navigate(['']);
    }, () => {
      this.failMessage = 'Nhập sai email';
    });
  }
}
