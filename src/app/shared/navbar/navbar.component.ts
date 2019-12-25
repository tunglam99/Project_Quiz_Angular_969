import {Component} from '@angular/core';
import {UserToken} from '../../model/user-token';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';
import {faSpellCheck} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  currentUser: UserToken;
  public isMenuCollapsed = true;
  quizIcon = faSpellCheck;
  hasRoleAdmin = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    const roleList = this.currentUser.roles;
    for (const role of roleList) {
      if (role.authority === 'ROLE_ADMIN') {
        this.hasRoleAdmin = true;
        break;
      }
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
