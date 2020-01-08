import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {User} from '../../model/user';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.css']
})
export class UpdateUserProfileComponent implements OnInit {
  currentUser: User;
  sub: Subscription;
  imgSrc = '../../../assets/img/Placeholder.jpg';
  selectedImage: any = null;
  failMessage = '';
  successMessage = '';
  userForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    gender: new FormControl(''),
    phoneNumber: new FormControl(''),
    avatar: new FormControl('')
  });
  userFirstName = '';
  userLastName = '';
  userGender = '';
  userPhoneNumber = '';
  userAvatarUrl = '';

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private storage: AngularFireStorage) {
  }

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      this.userService.getUserProfile(id).subscribe(value => {
        this.currentUser = value;
        this.userFirstName = this.currentUser.firstName;
        this.userLastName = this.currentUser.lastName;
        this.userGender = this.currentUser.gender;
        this.userPhoneNumber = this.currentUser.phoneNumber;
        this.userAvatarUrl = this.currentUser.avatar;
      }, error => {
        console.log(error);
      });
    });
  }

  updateUserProfile() {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      this.userService.getUserProfile(id).subscribe(value => {
        this.currentUser = value;
        const user: User = {
          id: this.currentUser.id,
          firstName: this.userForm.value.firstName,
          lastName: this.userForm.value.lastName,
          gender: this.userForm.value.gender,
          phoneNumber: this.userForm.value.phoneNumber,
          avatar: this.userForm.value.avatar
        };
        if (this.selectedImage !== null) {
          const filePath = `avatar/${this.currentUser.username}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
          const fileRef = this.storage.ref(filePath);
          this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe(url => {
                user.avatar = url;
                this.userService.updateUserProfile(this.currentUser.id, user).subscribe(() => {
                  this.successMessage = 'Cập nhật thông tin thành công';
                }, error => {
                  this.failMessage = 'Xảy ra lỗi khi cập nhật thông tin cá nhân';
                  console.log(error);
                });
              });
            })
          ).subscribe();
        } else {
          this.userService.updateUserProfile(this.currentUser.id, this.currentUser).subscribe(() => {
            this.successMessage = 'Cập nhật thông tin thành công';
          }, () => {
            this.failMessage = 'Xảy ra lỗi khi cập nhật thông tin cá nhân';
          });
        }
      }, error => {
        console.log(error);
      });
    });
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '../../../assets/img/Placeholder.jpg';
      this.selectedImage = null;
    }
  }
}
