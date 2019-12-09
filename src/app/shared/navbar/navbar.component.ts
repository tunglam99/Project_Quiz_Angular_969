import {Component} from '@angular/core';
import {UserToken} from '../../model/user-token';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';
import {faHome, faList, faQuestion, faSignInAlt, faSignOutAlt, faUserPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  currentUser: UserToken;
  public isMenuCollapsed = true;
  homeIcon = faHome;
  questionIcon = faQuestion;
  categoryIcon = faList;
  logoutIcon = faSignOutAlt;
  loginIcon = faSignInAlt;
  registerIcon = faUserPlus;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
