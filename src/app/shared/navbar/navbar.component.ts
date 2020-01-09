import {Component} from '@angular/core';
import {UserToken} from '../../model/user-token';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';
import {faSpellCheck, faUserEdit} from '@fortawesome/free-solid-svg-icons';
import {User} from '../../model/user';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  currentUser: UserToken;
  public isMenuCollapsed = true;
  quizIcon = faSpellCheck;
  updateUserIcon = faUserEdit;
  hasRoleAdmin = false;
  user: User;
  avatarUserUrl: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService) {
    this.authenticationService.currentUser.subscribe(value => this.currentUser = value);
    if (this.currentUser) {
      const roleList = this.currentUser.roles;
      for (const role of roleList) {
        if (role.authority === 'ROLE_ADMIN') {
          this.hasRoleAdmin = true;
          break;
        }
      }
      this.userService.getUserProfile(this.currentUser.id + '').subscribe(value => {
        this.user = value;
        this.avatarUserUrl = this.user.avatar;
      }, error => {
        console.log(error);
      });
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
